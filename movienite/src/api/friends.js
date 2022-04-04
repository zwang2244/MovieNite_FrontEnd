import api from '../utils/request';

export const getTrendAmongFriends = (currUser) => api.get(`/movie/movieWithHighVote?currUser=${currUser}`).then(res => res.data);
