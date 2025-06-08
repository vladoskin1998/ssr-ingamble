import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL =  'https://ig-api-prod.incasinowetrust.com/api/v1/' ;
// const baseURL = 'https://ig-api-prod.incasinowetrust.com/api/v1/'
const $api = axios.create({
    //   withCredentials: true,
    baseURL: baseURL,

});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //  config.headers.Authorization = '8f5d3f9e-2d7b-4b8f-a7c1-9c4e8b12a6e3';
    config.headers.Accept = "application/json";
    // config.headers.Cookie = "sessionid=1gzx5dk5bahkpztdsr27k65lvbkb5fkb";
    //  config.headers['X-CSRF-Token'] = 'jFRZKSLSi4CB38uR5pWaXQ5FU1X4rAfm;';
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default $api;
