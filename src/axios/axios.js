import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://jiaoxueapi.yanuojiaoyu.com'
const instance = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }
})
instance.interceptors.request.use(function (config) {
    //在发送请求之前做某事，比如加一个loading
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response.data
}, err => {
    return Promise.reject(err);
});

export default instance