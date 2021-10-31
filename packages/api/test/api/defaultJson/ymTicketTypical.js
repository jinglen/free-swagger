/* eslint-disable */
// @ts-nocheck

/**
 * generated by free-swagger
 * @see https://www.npmjs.com/package/free-swagger
 * @title Uber API
 * @description Move your app forward with the Uber API
 * @version 1.0.0
 * @date 2016-12-22 07:36
 **/

import axios from "axios";

/**
 * @description 新增或编辑标准票, 需走审批流程
 **/
export const AddOrUpdateTicketTypical = () =>
  axios.request({
    url: `/v1/api/services/app/YmTicketTypical/AddOrUpdateTicketTypical`,
    method: "post",
    params: {},
    data: {}
  });
