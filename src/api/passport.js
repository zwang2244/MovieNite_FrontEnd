import request from "../utils/request";

// 1.request.
// 2.write function (useId)
// 3.call: useQuery($keys$, getMovieEvents)    () => fn(index)  fn
//                 (["keys", userId]     , () => getMovieEvents(userId));
// 4.
//https://moive-nite.azurewebsites.net/movieevent/hosted_event?userID=20

export const login = (data) =>
  request.post("/passport/login", data).then((res) => res.data);

export const register = (data) =>
  request.post("/passport/register", data).then((res) => res.data);

export const checkIfEmailExist = (emailAddr) =>
  request
    .get(`/passport/userexists?emailAddr=${emailAddr}`)
    .then((res) => res.data);
