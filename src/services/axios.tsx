import axios from "axios";

const api = axios.create({
    baseURL: 'https://restapi-electshop.vercel.app',
    headers: {
      "Content-Type": true
    }    
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
});

  // Add a response interceptor
api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

export default api