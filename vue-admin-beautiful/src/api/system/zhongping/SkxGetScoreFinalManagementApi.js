import request from "@/utils/request";
import { downloadFileByData } from "@/utils/download";

export function getList(data) {
  return request({
    url: "/api/v1/system/zhongping/findPage",
    method: "get",
    params: data,
  });
}

export function balanceCount() {
  return request({
    url: "/api/v1/system/zhongping/balanceCount",
    method: "get",
  });
}

export function prePrizeCount() {
  return request({
    url: "/api/v1/system/zhongping/prePrizeCount",
    method: "get",
  });
}

export function prizeCount() {
  return request({
    url: "/api/v1/system/zhongping/prizeCount",
    method: "get",
  });
}

export function getExpertVotePre() {
  return request({
    url: "/api/v1/system/zhongping/getExpertVotePre",
    method: "get",
  });
}

export function getExpertVote() {
  return request({
    url: "/api/v1/system/zhongping/getExpertVote",
    method: "get",
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/system/zhongping/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/system/zhongping/update",
    method: "post",
    data,
  });
}

export function setBalance(data) {
  return request({
    url: "/api/v1/system/zhongping/setBalance",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/system/zhongping/del",
    method: "post",
    params: data,
  });
}

export function doDeleteAll(data) {
  return request({
    url: "/api/v1/system/zhongping/delAll",
    method: "post",
    params: data,
  });
}

/**
 * 导出Excel 目前只支持一层参数传递
 * @param data
 * @returns file
 */
export function doExportExcel(data) {
  let requestURL = "/api/v1/system/zhongping/exportExcel";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 下载模版
 * @returns file
 */
export function doDownloadTemplate() {
  let data = {};
  let requestURL = "/api/v1/system/zhongping/importExcel/template";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导入Excel
 * @returns file
 */
export function doImportExcel(data) {
  return request({
    url: "/api/v1/system/zhongping/importExcel",
    method: "post",
    // 最长超时时间 3 分钟
    timeout: 180000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
