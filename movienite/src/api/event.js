import request from '../utils/request';

// 1.request.
// 2.write function (useId)
// 3.call: useQuery($keys$, getMovieEvents)    () => fn(index)  fn
//                 (["keys", userId]     , () => getMovieEvents(userId));
// 4.

export const getMovieEvents = (userId) => request.get('/movieevent/hosted_event', {
  params: {
    userId: userId
  }
}).then(res => res.data);
