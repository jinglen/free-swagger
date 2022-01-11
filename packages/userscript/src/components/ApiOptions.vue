<template>
  <div style="display: flex; flex: 1 1 auto; height: 100%;">
    <el-select
      class="search"
      size="mini"
      placeholder="请选择 api"
      filterable
      v-model="state.key"
      @change="handleSearch"
    >
      <el-option
        v-for="(item, index) in state.options"
        :key="index"
        :value="item.key"
        @change="handleCopyApi()"
      >
        <div class="option-container">
          <div
            :class="[
              'label',
              {
                'light-green': item.method === 'patch',
                pink: item.method === 'options',
                purple: item.method === 'head',
                green: item.method === 'get',
                blue: item.method === 'post',
                yellow: item.method === 'put',
                red: item.method === 'delete'
              }
            ]"
          >
            {{ item.method }}
          </div>
          <div class="path">{{ item.path }}</div>
          <div class="summary">{{ item.collection.summary }}</div>
        </div></el-option
      >
    </el-select>
    <SelectApiModal
      :visible.sync="selectModal.visible"
      :options="selectModal.apiItems"
      @search="selectModal.handleSearch($event)"
    />
  </div>
</template>

<script>
import { state, handleCopyApi } from "@/state";
import { retry, waitUntil, handleTimeoutError, scriptLog } from "@/utils";
import { getMagicRgeExp } from "@/utils/findMagicApi";
import SelectApiModal from "./SelectApiModal.vue";

const createIdByHash = hash => {
  const arr = hash?.split("/") ?? [];
  return {
    tag: arr[arr.length - 2] ?? "",
    operationId: arr[arr.length - 1] ?? ""
  };
};

const findKeyByHash = hash => {
  const { tag, operationId } = createIdByHash(hash);
  const item = state.options.find(
    item =>
      encodeURIComponent(item.tag) === tag &&
      encodeURIComponent(item.collection.operationId) === operationId
  );
  return item?.key ?? "";
};

const findTargetApiItems = targetApi => {
  const apiItems = state.options.filter(option => option.path === targetApi);
  if (apiItems.length > 0) {
    return { apiItems, magic: false };
  } else {
    const regexp = getMagicRgeExp(targetApi);
    const apiItems = state.options.filter(option => regexp.test(option.path));
    const magic = apiItems.length > 0;
    return { apiItems, magic };
  }
};

export default {
  components: { SelectApiModal },
  name: "ApiOptions",
  data() {
    return {
      state,
      selectModal: {
        visible: false,
        apiItems: [],
        show: apiItems => {
          this.selectModal.apiItems = apiItems;
          this.selectModal.visible = true;
        },

        handleSearch: key => {
          this.handleSearch(key);
        }
      }
    };
  },
  mounted() {
    this.initOption();
  },
  methods: {
    handleCopyApi,
    async initOption() {
      try {
        await waitUntil(() => state.options.length);
      } catch (error) {
        handleTimeoutError(error);
        return;
      }
      const key = findKeyByHash(location.hash);
      const targetApi = new URL(location.href).searchParams.get("targetApi");
      if (key) {
        await this.handleSearch(key);
      } else if (targetApi) {
        // 使用过一次就从历史记录中删除
        const url = new URL(location.href);
        url.searchParams.delete("targetApi");
        window.history.pushState({}, "", url.href);

        const { apiItems, magic } = findTargetApiItems(targetApi);
        if (apiItems.length > 0) {
          if (magic) {
            this.$notify.info({
              title: "魔法 pathName",
              message: `当前匹配结果为转换后的魔法 pathName. \n ${apiItems[0].path}`
            });
          }
          await this.handleSearchApiItems(apiItems);
        } else {
          this.$notify.info({
            title: "未找到 Api",
            message: `${targetApi}`
          });
        }
      }
    },
    async handleSearchApiItems(apiItems) {
      if (apiItems.length === 1) {
        await this.handleSearch(apiItems[0].key);
      } else {
        this.selectModal.show(apiItems);
      }
    },
    findControllerDom({ isNewUi, controller }) {
      if (isNewUi) {
        return document.querySelector(`[title="${controller}"]`);
      } else {
        const id = `operations-tag-${controller.replace(/\s/g, "_")}`;
        return document.getElementById(id);
      }
    },
    findApiDom({ controllerDom, isNewUi, id }) {
      if (isNewUi) {
        return controllerDom.querySelector(`[data-hashurl$="${id}"]`);
      } else {
        return document.getElementById(id);
      }
    },
    openControllerDom(controllerDom, isNewUi) {
      const isOpen = isNewUi
        ? controllerDom.classList.contains("open")
        : controllerDom.parentNode.classList.contains("is-open");
      if (isOpen) return;
      if (isNewUi) {
        controllerDom.querySelector("* > a").click();
      } else {
        controllerDom.click();
      }
    },
    clickApiDom(apiDom, isNewUi) {
      if (isNewUi) {
        apiDom.click();
      } else {
        apiDom.classList.contains("is-open") ||
          apiDom.querySelector("a")?.click();
      }
    },
    // 展开一个 api
    async expandApiCollapse({ collection, path, method }) {
      const { controller, operationId } = collection;
      const controllerDom = this.findControllerDom({
        isNewUi: state.isNewUi,
        controller
      });
      if (!controllerDom) return false;
      this.openControllerDom(controllerDom, state.isNewUi);
      await this.$nextTick();
      const id = `operations-${controller}-${operationId}`;
      // 生成默认 id
      // /a/b/c -> a_b_c
      const apiDom = this.findApiDom({
        isNewUi: state.isNewUi,
        controllerDom,
        id
      });
      if (!apiDom) return false;
      this.clickApiDom(apiDom);
      return { apiDom, controllerDom };
    },
    async handleSearch(key, echo = false) {
      state.key = key;
      state.currentApi = state.options.find(item => item.key === key);
      // handleCopyApi(
      //   state.currentApi.path,
      //   state.currentApi.method,
      //   state.swagger
      // );
      // 通过 change 事件触发时，显示高亮
      if (!echo) {
        await retry({
          cb: async () => {
            const res = await this.expandApiCollapse(state.currentApi);
            await this.$nextTick();
            if (res) {
              const apiDom = res.apiDom;
              // 不设置定时器可能会滚不了。。
              setTimeout(() => {
                apiDom.scrollIntoView({ behavior: "smooth" });
                // 去掉，影响视觉体验
                // highlightDOM(apiDom, "custom-highlight-anime");
              });
              return apiDom;
            }
          },
          retryNumber: 10,
          error: () => console.error("Error: 未监测到匹配的 dom 节点")
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shallow-yellow {
  background: #fff7eeb0;
}
.option-container {
  display: flex;
  .summary {
    color: #808080a6;
    margin-left: 10px;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    padding-left: 20px;
  }
  .light-green {
    color: #1ce3c3;
  }
  .red {
    color: #ff3f45;
  }
  .purple {
    color: #941af9;
  }
  .pink {
    color: pink;
  }
  .yellow {
    color: #ffa142;
  }
  .green {
    color: #67c23a;
  }
  .blue {
    color: #409eff;
  }
  .added {
    position: absolute;
    left: 20px;
  }
  .path {
    margin-left: 10px;
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.search,
::v-deep .el-input.el-input.el-input {
  height: 100%;
  flex: 1;
}

.search {
  margin-right: 12px;
}

::v-deep input {
  height: 100% !important;
}
</style>
