<template>
  <el-dialog
    title="匹配到多个 Api"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    width="760px"
  >
    <el-button
      plain
      class="option-wrapper"
      v-for="(item, index) in options"
      :key="index"
      :value="item.key"
      @click="go(item.key)"
      style="display: block; width: 100%; margin: 20px 0; height: 42px;"
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
        <div class="icon">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-button>

    <template #footer class="dialog-footer">
      <span></span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
    visible: { type: Boolean, default: false }
  },
  methods: {
    go(key) {
      this.$emit("search", key);
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.shallow-yellow {
  background: #fff7eeb0;
}

.option-wrapper {
  display: block;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 8px 0 #e8edfa99, 0 2px 4px 0 #e8edfa99;
  margin-bottom: 1em;
  padding: 12px 0;
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
