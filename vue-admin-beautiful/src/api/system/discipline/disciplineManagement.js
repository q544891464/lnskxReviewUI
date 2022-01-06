import request from "@/utils/request";

export function getTreeAll() {
  return request({
    url: "/api/v1/system/discipline/findTreeAll",
    method: "get",
  });
}

export function getTree(data) {
  return request({
    url: "/api/v1/system/discipline/findTree",
    method: "get",
    params: data,
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/system/discipline/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/system/discipline/update",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/system/discipline/del",
    method: "post",
    params: data,
  });
}
