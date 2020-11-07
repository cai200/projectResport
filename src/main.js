// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import splitPane from 'vue-splitpane'
import {Message} from 'element-ui';
import axios from 'axios'
import common from './assets/js/common'
import 'jquery'
import store from "./vuex/index"
import http from './util/api'

Vue.component('split-pane', splitPane);
Vue.prototype.echarts = echarts
Vue.prototype.http = http
//Vue.use(router);
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.axios = axios
Vue.prototype.common= common,
Vue.prototype.update = new Vue()
axios.defaults.timeout=3000
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.baseURL = '/api'  //关键代码
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
