import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: 'https://huda.descode.id',
  headers: {
    "Content-Type": "application/json"
  }    
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
  const Store = store.getState()
  const token = Store.authSlice.token

  if(token !== "") {
    console.log('config', config)
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;

}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if(error.response && error.response.status === 401) {
    return Promise.reject(error);
  }
});



export default api