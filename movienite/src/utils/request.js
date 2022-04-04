import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:8088", //api url
  baseURL: 'https://moive-nite.azurewebsites.net',
  timeout: 25000,
});

//TODO Interceptors

export default service;
