import api from '../utils/request';

export const getTrendAmongFriends = (currUser) => api.get(`/movie/movieWithHighVote?currUser=${currUser}`).then(res => res.data);

export const getAllFriends = (userID) =>  api.get(`/user/friends/all`, {
  params: {
    userID: userID
  }
}).then(res => res.data) ;

export const addFriends = (userID1, userID2) => api.post(
  `/user/friend/add?myId=${userID1}&userId=${userID2}` 
).then(res => res.data);

export const deleteFriends = (userID1, userID2) => api.post(
  `/user/friend/del?myId=${userID1}&userId=${userID2}` 
).then(res => res.data);