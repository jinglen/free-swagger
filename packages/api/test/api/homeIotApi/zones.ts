/* eslint-disable */
// @ts-nocheck

/**
 * generated by free-swagger
 * @see https://www.npmjs.com/package/free-swagger
 * @title home-iot-api
 * @description The API for the EatBacon IOT project
 * @version 1.0.0
 * @date 2016-12-22 07:36
 **/

import { AxiosResponse } from "axios";
import http from "http";

export const getZones = () =>
  axios.request<string[]>({
    url: `/yeyan1996/IOT/1.0.0/zones`,
    method: "get",
    params: {},
    data: {}
  });

export const quietZone = (
  _NOOP: Record<string, never>,
  {
    zoneId
  }: {
    zoneId: string;
  }
) =>
  axios.request<any>({
    url: `/yeyan1996/IOT/1.0.0/zones/${zoneId}/quiet`,
    method: "get",
    params: {},
    data: {}
  });
