import api from "../utils/request";

//getMovieTrending
const getMovieTrending = () => api.get('').then(res => res.data);

//searchMovie
const searchMovie = (params) => api.get(`${params}`).then(res => res.data); // we can also limit 10

//getFriends
const getFriendList = (userId) => api.get(`${userId}`).then(res => res.data); // when can limit 10





