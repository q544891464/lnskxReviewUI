import request from "@/utils/request";
import { downloadFileByData } from "@/utils/download";

export function getList(data) {
  return request({
    url: "/api/v1/system/expertSubmit/findPage",
    method: "get",
    params: data,
  });
}

export function getSubmitInfoByCurrentUser() {
  return request({
    url: "/api/v1/system/expertSubmit/getSubmitInfoByCurrentUser",
    method: "get",
  });
}

export function setAvgScoreAll(data) {
  return request({
    url: "/api/v1/system/expertSubmit/setAvgScoreAll",
    method: "get",
    params: data,
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/system/expertSubmit/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/system/expertSubmit/update",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/system/expertSubmit/del",
    method: "post",
    params: data,
  });
}

export function doDeleteAll(data) {
  return request({
    url: "/api/v1/system/expertSubmit/delAll",
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
  let requestURL = "/api/v1/system/expertSubmit/exportExcel";
  // 下载文件
  downloadFileByData(requestURL, data);
}

export function doExportExpertWord(data) {
  return request({
    url: "/api/v1/system/expertSubmit/exportExpertWord",
    method: "get",
    params: data,
  });
}

export function doUploadExpertPdf(data) {
  return request({
    url: "/api/v1/system/expertSubmit/uploadExpertPdf",
    method: "post",
    // 最长超时时间 3 分钟
    timeout: 180000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}

/**
 * 下载模版
 * @returns file
 */
export function doDownloadTemplate() {
  let data = {};
  let requestURL = "/api/v1/system/expertSubmit/importExcel/template";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导入Excel
 * @returns file
 */
export function doImportExcel(data) {
  return request({
    url: "/api/v1/system/expertSubmit/importExcel",
    method: "post",
    // 最长超时时间 3 分钟
    timeout: 180000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
