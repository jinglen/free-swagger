/* eslint-disable */
import axios from "axios";

// 新增或编辑标准票, 需走审批流程
export const AddOrUpdateTicketTypical = (params, pathParams) =>
  axios.request({
    url: `/api/services/app/YmTicketTypical/AddOrUpdateTicketTypical`,
    method: "post",
    params: {},
    data: params,
    responseType: "json"
  });
