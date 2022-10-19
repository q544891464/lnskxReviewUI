import request from "@/utils/request";
import { urlAddArgsByData } from "@/utils";
const { baseURL } = require("@/config/settings");
import { encryptedRsa } from "@/utils/crypto/encrypt-rsa";
import { loginRSA, tokenName } from "@/config/settings";
import Vue from "vue";

export async function login(data) {
  if (loginRSA) {
    // 获得公钥
    let publicKey = Vue.prototype.$getPublicKey();
    // 加密数据
    let encrypted = encryptedRsa(data, publicKey);
    data = {
      encryptData: encrypted,
    };
  }
  return request({
    url: "/system/login",
    method: "post",
    data,
  });
}

export function getSlipCount(data) {
  return request({
    url: "/system/slipCount",
    method: "get",
    params: data,
  });
}

export function getUserInfo(accessToken) {
  return request({
    url: "/api/v1/system/user/getInfo",
    method: "get",
    headers: {
      [tokenName]: accessToken,
    },
  });
}

export function getOrgInfoByCode(data) {
  return request({
    url: "/api/v1/system/orgInfo/getByCode",
    method: "get",
    params: data,
  });
}

export function getUserOrg(accessToken) {
  return request({
    url: "/api/v1/system/user/getOrg",
    method: "get",
    headers: {
      [tokenName]: accessToken,
    },
  });
}

export function logout() {
  return request({
    url: "/system/logout",
    method: "post",
  });
}

// TODO:暂时直接把XTOKEN写死
export function register(data) {
  return request({
    url: "/system/register",
    method: "post",
    data,
    headers: {
      "X-Token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6IjAiLCJ0eXBlIjoic3lzdGVtIiwiZXhwIjoxNjU1NzE5NzY5LCJ1c2VySWQiOiIxIiwiYWNjb3VudCI6InN5c3RlbSIsInRpbWVzdGFtcCI6IjE2NTU3MTI1NjkyODAifQ.-4t67bFrggCffaXUqoxMOgW5vbFcvYpfkykan0U3muI",
    },
  });
}

export function captcha(uuid) {
  // 请求地址
  let url = "/captcha";
  let data = {
    uuid: uuid,
    timestamp: new Date().getTime(),
  };

  // 转换参数
  let params = Object.keys(data)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");

  return baseURL + urlAddArgsByData(url, params);
}
