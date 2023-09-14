import axios from "axios";

const api = axios.create({
    baseURL: 'https://huda.descode.id',
    headers: {
      "Content-Type": "application/json"
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