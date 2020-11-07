import axios from 'axios'
import Vue from 'vue'
import {Message,Loading} from "element-ui";

Vue.use(axios)
const service=axios.create({
  baseURL:process.env.baseURL,
  timeout:10000
  // if (process.env.NODE_ENV == 'development') {
  //   config.defaults.baseURL = process.env.NODE_ENV
  // }
  // else if (process.env.NODE_ENV == 'debug') {
  //   config.defaults.baseURL = 'https://www.ceshi.com';
  // }
  // else if (process.env.NODE_ENV == 'production') {
  //   config.defaults.baseURL = 'https://www.production.com';
  // }
  // config.defaults.timeout=3*1000;
  // return config
})
let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  loading.close()
}
// 请求拦截
service.interceptors.request.use(
  (confing) => {
    startLoading();
    //设置请求头
    // if (localStorage.eToken) {
    // //  confing.headers.Authorization = localStorage.eToken
    // }
    return confing;
  },
  (error) => {
    return Promise.reject(error);
  }
)
//响应拦截
service.interceptors.response.use(
  (response) => {
    endLoading();
    return response;
  },
  (error) => {
    Message.error(error.response.data)
    endLoading()
    // 获取状态码
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求错误');
        break;
      case 401:
        Message.error('请重新登录');
        break;
      case 403:
        Message.error('拒绝访问');
        break;
      case 404:
        Message.error('请求错误，未找到资源');
        break;
      case 405:
        Message.error('请求方法不被允许');
        break;
      case 408:
        Message.error('请求超时');
        break;
      case 500:
        Message.error('服务器错误');
        break;
      case 501:
        Message.error('网络未实现');
        break;
      case 502:
        Message.error('网络错误');
      case 503:
        Message.error('网络错误');
      case 504:
        Message.error('网络超时');
      case 505:
        Message.error('http版本不支持该请求');
        break;
      default:
        Message.error(`链接错误{status}`);

    }

    return Promise.reject(error)
  }
)
export default service
