import request from '../utils/request';

// 1.request.
// 2.write function (useId)
// 3.call: useQuery($keys$, getMovieEvents)    () => fn(index)  fn
//                 (["keys", userId]     , () => getMovieEvents(userId));
// 4.
//https://moive-nite.azurewebsites.net/movieevent/hosted_event?userID=20
export const getMovieEvents = (userId) => request.get('/movieevent/movieevent/info', {
  params: {
    userId: userId
  }
}).then(res => res.data);

export const createNewEvent = (data) => request.post('/movieevent/new_event', data).then(res => res.data);

export const deleteEvent = (eventId) => request.post(`/movieevent/event/delete?eventId=${eventId}`).then(res => res.data);

export const updateEvent = (data) => request.post('/movieevent/event/update', data).then(res => res.data);



