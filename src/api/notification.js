import api from "../utils/request";

export const getNotification = (useId) =>
  api.get(`/notification/all?userId=${useId}`).then((res) => res.data);

export const deleteNotification = (nId) =>
  api.post(`/notification/del?nId=${nId}`).then((res) => res.data);

export const readToUnread = (nId) =>
  api.post(`/notification/readtounread?nId=${nId}`).then((res) => res.data);

export const unreadToRead = (nId) =>
  api.post(`/notification/unreadtoread?nId=${nId}`).then((res) => res.data);

export const getNotificationCount = (userId) =>
  api
    .get(`/notification/unread/count?userId=${userId}`)
    .then((res) => res.data);
