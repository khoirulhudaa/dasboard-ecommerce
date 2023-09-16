import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate()

const api = axios.create({
    baseURL: 'https://huda.descode.id',
    headers: {
      "Content-Type": "application/json"
    }    
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
    const token = useSelector((state: any) => state.authSlice.token)

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
      navigate('/')
    }
    return Promise.reject(error);
});

export default api