import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8088", //api url
  // baseURL: 'deployed website'
  timeout: 25000,
});

//TODO Interceptors

export default service;
