/*
 * @Date: 2021-12-03 16:37:50
 * @LastEditTime: 2021-12-03 16:37:50
 * @FilePath: \vue-admin-demo\src\utils\auth.js
 * 从cookies里获取、放入、删除token
 */
import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
