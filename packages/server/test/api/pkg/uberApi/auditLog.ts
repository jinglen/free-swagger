// generated by free-swagger
// @ts-nocheck
/* eslint-disable */
import { IPagedResult, AuditLogListDto } from "./interface/index.ts";
import axios, { AxiosResponse } from "axios";

export const GetAuditLogs = (params: { StartDate?: string }) =>
  axios.request<IPagedResult<AuditLogListDto>, AxiosResponse<IPagedResult<AuditLogListDto>>>({
    url: `/api/services/app/AuditLog/GetAuditLogs`,
    method: "get",
    params: params,
    data: {}
  });
