import axios from 'axios'
import Cookie from '../Services/cookies'

const api = axios.create({
    /*baseURL: process.env.REACT_APP_API,*/
    baseURL: "https://tvs.grupoivasko.com.br/painel/public/api",
    //baseURL: "http://10.1.50.11/painel/public/api/",
});

api.interceptors.request.use((config) => {
    const token = Cookie.getToken();
    
    if(token){
      /*config.headers.common['Authorization'] = `Bearer ${token}`;*/
      config.headers.Authorization =  `Bearer ${token}`
    }

   /* config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';*/
    
    return config;
 },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;