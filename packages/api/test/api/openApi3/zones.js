/* eslint-disable */
// @ts-nocheck

/**
 * generated by free-swagger
 * @see https://www.npmjs.com/package/free-swagger
 * @title home-iot-api
 * @description The API for the EatBacon IOT project
 * @version 1.0.0-oas3
 * @date 2016-12-22 07:36
 **/

import axios from "axios";

/**
 * @description
 **/
export const getZones = () =>
  axios.request({
    url: `/yeyan1996/IOT/1.0.0/zones`,
    method: "get",
    params: {},
    data: {}
  });

/**
 * @description
 * @param {Object} _NOOP - never
 * @param {Object} pathParams
 * @param {string} pathParams.zoneId
 **/
export const quietZone = (_NOOP, { zoneId }) =>
  axios.request({
    url: `/yeyan1996/IOT/1.0.0/zones/${zoneId}/quiet`,
    method: "get",
    params: {},
    data: {}
  });
