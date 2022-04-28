import api from "../utils/request";

export const ratingMovie = (data) =>
  api.post(`/movie/scoreMovie`, data).then((res) => res.data);
