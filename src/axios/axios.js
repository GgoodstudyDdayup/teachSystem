import axios from 'axios'
// import store from '../store'
axios.defaults.baseURL = 'https://jiaoxueapi.yanuojiaoyu.com'
axios.defaults.transformRequest = [
    function (data) {
        let ret = "";
        for (let it in data) {
            ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
    }
]
const instance = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    // withCredentials: true,
})
instance.interceptors.request.use(function (config) {
    console.log(config)
    //在发送请求之前做某事，比如加一个loading
    // console.log(store.getState())
    // if (store.getState().UserState.token) {
    //     config.headers['Cookie'] = store.getState().UserState.token
    //     console.log(config)
    //     return config;
    // } else {
    //     window.location.replace("/");
    //     return false
    // }
    return config
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response.data
}, err => {
    return Promise.reject(err);
});

const loginPost = axios
export { instance, loginPost } 