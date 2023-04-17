import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 30000
});

request.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    }
    if (config.method.toLocaleUpperCase() === 'GET' || config.method.toLocaleUpperCase() === 'DELETE') {
      if (!config.params) {
        config.params = {};
      }
      config.params.t = new Date().getTime();
    } else if (config.method.toLocaleUpperCase() === 'POST' || config.method.toLocaleUpperCase() === 'PUT') {
      if (!config.data) {
        config.data = {};
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default request;
