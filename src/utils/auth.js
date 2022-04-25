import { localUserInfo } from "../context/auth-context";

export const logoutLocal = async () =>
  window.localStorage.removeItem(localUserInfo);

export const loginLocal = async (userInfo) =>
  window.localStorage.setItem(localUserInfo, userInfo);

export const firstMount = async () =>
  window.localStorage.getItem(localUserInfo);
