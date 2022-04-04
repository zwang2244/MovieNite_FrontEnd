import api from "../utils/request";

//getMovieTrending
export const getMovieTrending = () => api.get('https://moive-nite.azurewebsites.net/movieevent/attendees?eventId=2').then(res => res.data);

//searchMovie
const searchMovie = (params) => api.get(`${params}`).then(res => res.data); // we can also limit 10

//getFriends
const getFriendList = (userId) => api.get(`${userId}`).then(res => res.data); // when can limit 10





