import api from './request'
let base={
  url1:"/projectResport/readUser"
}
export default {
  getData1:function (params) {
    api.post(base.url1,params)
  }
}
