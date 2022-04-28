import api from "../utils/request";

//getMovieTrending
export const getMovieTrending = () =>
  api
    .get("https://moive-nite.azurewebsites.net/movieevent/attendees?eventId=2")
    .then((res) => res.data);

//searchMovie
const searchMovie = (params) => api.get(`${params}`).then((res) => res.data); // we can also limit 10

//getFriends
const getFriendList = (userId) => api.get(`${userId}`).then((res) => res.data); // when can limit 10

//getMovieDetail
// `/movieevent/event/delete?eventId=${eventId}`
export const getMovieById = (imdbId) =>
  api.get(`/movie/?movieID=${imdbId}`).then((res) => res.data);

//movie/?movieID=tt0371746&userId=5
export const getMovieByUserIdAndMovieId = (imdbID, userId) =>
  api.get(`/movie/?movieID=${imdbID}&userId=${userId}`).then((res) => res.data);
