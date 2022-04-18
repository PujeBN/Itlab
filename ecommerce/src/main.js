import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import store from "./store";
  // import "./global-components";

import { Loading, Message, MessageBox, Backtop, Notification } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// ITLAB Theme

import "./vendor/font-awesome/css/fontawesome-all.min.css";
import "./vendor/hs-megamenu/src/hs.megamenu.css";
import "./vendor/fancybox/jquery.fancybox.css";
import "./vendor/slick-carousel/slick/slick.css";
import "./vendor/animate.css/animate.min.css"
import "./vendor/hs-megamenu/src/hs.megamenu.js";

import "./assets/css/theme.css";

// var AppURL = 'http://192.168.0.111:8001';
var AppURL = 'https://api.itlab.mn';
Vue.config.productionTip = false;


Vue.use(ElementUI, { locale });
Vue.use(Backtop);
Vue.use(Loading.directive);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$appUrl = AppURL;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
