import api from '../utils/request';

export const getUserInfo = (userId) => api.get(`/user/info?userId=${userId}`).then(res => res.data);


