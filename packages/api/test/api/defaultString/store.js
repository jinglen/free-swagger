/* eslint-disable */
// @ts-nocheck

/**
 * generated by free-swagger
 * @see https://www.npmjs.com/package/free-swagger
 * @title Swagger Petstore
 * @description This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 * @fileDescription Access to Petstore orders
 * @version 1.0.3
 * @date 2016-12-22 07:36
 **/

import axios from "axios";

/**
 * @description Returns pet inventories by status
 **/
export const getInventory = () =>
  axios.request({
    url: `/v2/store/inventory`,
    method: "get",
    params: {},
    data: {}
  });

/**
 * @description Find purchase order by ID
 * @param {Object} _NOOP -never
 * @param {Object} pathParams
 * @param {number} pathParams.orderId -ID of pet that needs to be fetched
 **/
export const getOrderById = (_NOOP, { orderId }) =>
  axios.request({
    url: `/v2/store/order/${orderId}`,
    method: "get",
    params: {},
    data: {}
  });

/**
 * @description Delete purchase order by ID
 * @param {Object} _NOOP -never
 * @param {Object} pathParams
 * @param {number} pathParams.orderId -ID of the order that needs to be deleted
 **/
export const deleteOrder = (_NOOP, { orderId }) =>
  axios.request({
    url: `/v2/store/order/${orderId}`,
    method: "delete",
    params: {},
    data: {}
  });

/**
 * @description Place an order for a pet
 * @param {Order} params -order placed for purchasing the pet
 **/
export const placeOrder = (params) =>
  axios.request({
    url: `/v2/store/order`,
    method: "post",
    params: {},
    data: params
  });
