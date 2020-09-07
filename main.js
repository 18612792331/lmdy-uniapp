import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import httpInterceptor from '@/common/http.interceptor.js';

Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
Vue.use(httpInterceptor, app)
app.$mount()
