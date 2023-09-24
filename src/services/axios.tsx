import axios from "axios";
import store from "../store/store";
const api = axios.create({
  baseURL: 'https://huda.descode.id',
  headers: {
    "Content-Type": "application/json"
  }    
})

// Tambahkan interceptor permintaan
api.interceptors.request.use(function (config) {
  const Store = store.getState()
  const token = Store.authSlice.token

  console.log('token API:', token)

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;

}, function (error) {
  return Promise.reject(error);
});

// Tambahkan interceptor respons
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response && error.response.status === 401) {
    console.log(error)
    return Promise.reject(error);
  }
});

export default api;