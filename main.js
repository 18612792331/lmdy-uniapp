import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import httpInterceptor from '@/common/http.interceptor.js';

Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)
const app = new Vue({
    ...App
})
Vue.use(httpInterceptor, app)
app.$mount()
