import axios from "axios";
import Redirecter from "../helpers/redirecter";
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
  console.log('response interceptors:', response)
  return response
}, function (error) {
  console.log('error interceptors:', error)
  if (error.response && error.response.status === 403) {
    return <Redirecter route="/auth/boxed-signin" status={true} /> 
  }
});

export default api;