// generated by free-swagger
// @ts-nocheck
/* eslint-disable */
import { DeviceRegistrationInfo } from "./interface/index.ts";
import http, { AxiosResponse } from "axios";

export const getDevices = (params: { skip?: number; limit?: number }) =>
  http.request<string[], AxiosResponse<string[]>>({
    url: `/devices`,
    method: "get",
    params: params,
    data: {}
  });

export const register = (params: DeviceRegistrationInfo) =>
  http.request<any, AxiosResponse<any>>({
    url: `/devices`,
    method: "post",
    params: {},
    data: params
  });
