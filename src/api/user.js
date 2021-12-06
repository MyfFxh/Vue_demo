/*
 * @Date: 2021-12-03 16:56:18
 * @LastEditTime: 2021-12-03 16:58:18
 * @FilePath: \vue-admin-demo\src\api\user.js
 */
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}
