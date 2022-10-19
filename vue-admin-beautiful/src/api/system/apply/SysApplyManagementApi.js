import request from "@/utils/request";
import { downloadFileByData } from "@/utils/download";

export function getCount(data) {
  return request({
    url: "/api/v1/system/apply/getCount",
    method: "get",
    params: data,
  });
}

export function getList(data) {
  return request({
    url: "/api/v1/system/apply/findPage",
    method: "get",
    params: data,
  });
}

export function getListAll(data) {
  return request({
    url: "/api/v1/system/apply/findPageAll",
    method: "get",
    params: data,
  });
}

export function getListByOrg(data) {
  return request({
    url: "/api/v1/system/apply/findPageByOrg",
    method: "get",
    params: data,
  });
}

export function getListByDiscipline(data) {
  return request({
    url: "/api/v1/system/apply/findPageByDiscipline",
    method: "get",
    params: data,
  });
}

export function getListByIsPassed(data) {
  return request({
    url: "/api/v1/system/apply/findPageByIsPassed",
    method: "get",
    params: data,
  });
}

export function doIsPassApply(data) {
  return request({
    url: "/api/v1/system/apply/isPassApply",
    method: "post",
    params: data,
  });
}

export function doSetPreRank(data) {
  return request({
    url: "/api/v1/system/apply/setPreRank",
    method: "post",
    params: data,
  });
}

export function doSetPrize(data) {
  return request({
    url: "/api/v1/system/apply/setPrize",
    method: "post",
    params: data,
  });
}

export function doSetCompletedFile(data) {
  return request({
    url: "/api/v1/system/apply/setCompletedFile",
    method: "post",
    params: data,
  });
}

export function doSetDisciplineReviewPrize(data) {
  return request({
    url: "/api/v1/system/apply/setDisciplineReviewPrize",
    method: "post",
    params: data,
  });
}

export function doSetSubjectGroup(data) {
  return request({
    url: "/api/v1/system/apply/setSubjectGroup",
    method: "post",
    params: data,
  });
}

export function doSetSubjectGroupAll(data) {
  return request({
    url: "/api/v1/system/apply/setSubjectGroupAll",
    method: "post",
    params: data,
  });
}

export function doUpload(data) {
  return request({
    url: "/api/v1/system/apply/uploadFile",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // 最长超时时间 3 分钟
    timeout: 180000,

    data,
  });
}

export function doUploadOtherFile(data) {
  return request({
    url: "/api/v1/system/apply/uploadOtherFile",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // 最长超时时间 3 分钟
    timeout: 180000,

    data,
  });
}

export function doUploadCompletedFile(data) {
  return request({
    url: "/api/v1/system/apply/uploadCompletedFile",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // 最长超时时间 3 分钟
    timeout: 180000,

    data,
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/system/apply/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/system/apply/update",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/system/apply/del",
    method: "post",
    params: data,
  });
}

export function doDeleteAll(data) {
  return request({
    url: "/api/v1/system/apply/delAll",
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
  let requestURL = "/api/v1/system/apply/exportExcel";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导出Excel 目前只支持一层参数传递
 * 用于查看自己提交的数据
 * @param data
 * @returns file
 */
export function doExportExcelById(data) {
  let requestURL = "/api/v1/system/apply/exportExcelById";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导出Excel 目前只支持一层参数传递
 * 用于初审 查看本组织的数据
 * @param data
 * @returns file
 */
export function doExportExcelByOrg(data) {
  let requestURL = "/api/v1/system/apply/exportExcelByOrg";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导出Excel 目前只支持一层参数传递
 * 用于终极评审 查看已通过的数据
 * @param data
 * @returns file
 */
export function doExportExcelByIsPass(data) {
  let requestURL = "/api/v1/system/apply/exportExcelByIsPass";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 下载模版
 * @returns file
 */
export function doDownloadTemplate() {
  let data = {};
  let requestURL = "/api/v1/system/apply/importExcel/template";
  // 下载文件
  downloadFileByData(requestURL, data);
}

/**
 * 导入Excel
 * @returns file
 */
export function doImportExcel(data) {
  return request({
    url: "/api/v1/system/apply/importExcel",
    method: "post",
    // 最长超时时间 3 分钟
    timeout: 180000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
