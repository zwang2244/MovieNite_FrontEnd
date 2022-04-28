import api from "../utils/request";

export const addComment = (data) =>
  api.post(`/comment/add`, data).then((res) => res.data);

export const getCommentByImdbId = (imdbId) =>
  api.get(`/comment/movie?imdbId=${imdbId}`).then((res) => res.data);

export const deleteCommentById = (id) =>
  api.post(`comment/del?id=${id}`).then((res) => res.data);

// /comment/movie?imdbId=12323"

// https://moive-nite.azurewebsites.net/comment/del?id=123
