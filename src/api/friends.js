import api from '../utils/request';

export const getTrendAmongFriends = (currUser) => api.get(`/movie/movieWithHighVote?currUser=${currUser}`).then(res => res.data);

export const getAllFriends = (userID) =>  api.get(`/user/friends/all`, {
  params: {
    userID: userID
  }
}).then(res => res.data) ;

