// 1 - 安装axios
// 2 - 引入 axios
import axios from 'axios'
// 3 - 导出request函数
export function request(config) {
  // 4 - 创建实例化axios
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5/',
    timeout: 5000
  })
  // 6 - 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  }, err => {
    // console.log(err);
    return err
  })
  // 7 - 响应拦截
  instance.interceptors.response.use(results => {
    // console.log(results);
    return results
  }, err => {
    // console.log(err);
    return err
  })
  // 5 - 使用并返回实例化的axios
  return instance(config)

}
