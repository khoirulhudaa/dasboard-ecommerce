import axios from "axios";
import store from "../store/store";

const api = axios.create({
  baseURL: 'https://huda.descode.id',
  headers: {
    "Content-Type": "application/json"
  }    
})

// Fungsi untuk mengatur token dalam header permintaan Axios
const setAuthorizationHeader = (token: any) => {
  api.defaults.headers.common['Authorization'] = token;
}

// Tambahkan interceptor permintaan
api.interceptors.request.use(function (config) {
  const Store = store.getState()
  const token = Store.authSlice.token

  if (token !== '') {
    setAuthorizationHeader(token)
    console.log('token API:', token)
  }

  return config;

}, function (error) {
  return Promise.reject(error);
});

// Tambahkan interceptor respons
api.interceptors.response.use(function (response) {
  console.log('error 401:', response)
  return response;
}, function (error) {
  console.log('error 401:', error)
  if (error.response && error.response.status === 401) {
    return Promise.reject(error);
  }
});

export default api;