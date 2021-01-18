/**
 * 系统监控
 *
 * @作者 薛佳琪
 * @创建时间 2020/11/27 14:37
 */

import request from "@/utils/request";

export function getSystemInfo(data) {
  return request({
    url: "/api/v1/sys/monitor/getSystemInfo",
    method: "get",
    params: data,
  });
}
export function getCpuInfo(data) {
  return request({
    url: "/api/v1/sys/monitor/getCpuInfo",
    method: "get",
    params: data,
  });
}
export function getMemInfo(data) {
  return request({
    url: "/api/v1/sys/monitor/getMemInfo",
    method: "get",
    params: data,
  });
}
export function getJVMInfo(data) {
  return request({
    url: "/api/v1/sys/monitor/getJVMInfo",
    method: "get",
    params: data,
  });
}
