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
    // withCredentials: true
})
instance.interceptors.request.use(function (config) {
    config.headers['username'] = sessionStorage.getItem("username")
    config.headers['token'] = sessionStorage.getItem("token")
    return config
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if (response.data.code === '404') {
        window.location.replace("http://zt.zhongxiaoxue.cn/node/build/#/");
    } else {
        return response.data
    }
}, err => {
    return Promise.reject(err);
});

const loginPost = axios
export { instance, loginPost } 