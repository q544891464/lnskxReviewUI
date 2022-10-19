import request from "@/utils/request";
import { downloadFileByData } from "@/utils/download";

export function getList(data) {
  return request({
    url: "/api/v1/system/scoreDetail/findPage",
    method: "get",
    params: data,
  });
}

export function getScoreList(data) {
  return request({
    url: "/api/v1/system/scoreDetail/getScoreList",
    method: "get",
    params: data,
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/system/scoreDetail/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/system/scoreDetail/update",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/system/scoreDetail/del",
    method: "post",
    params: data,
  });
}

export function doDeleteAll(data) {
  return request({
    url: "/api/v1/system/scoreDetail/delAll",
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
  let requestURL = "/api/v1/system/scoreDetail/exportExcel";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 下载模版
 * @returns file
 */
export function doDownloadTemplate() {
  let data = {};
  let requestURL = "/api/v1/system/scoreDetail/importExcel/template";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导入Excel
 * @returns file
 */
export function doImportExcel(data) {
  return request({
    url: "/api/v1/system/scoreDetail/importExcel",
    method: "post",
    // 最长超时时间 3 分钟
    timeout: 180000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
