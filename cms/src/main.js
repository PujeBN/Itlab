
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios';
import ArgonDashboard from './plugins/argon-dashboard'
import { Loading, Message, MessageBox, Notification, Popover } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueHtmlToPaper from 'vue-html-to-paper';
// var AppURL = 'http://192.168.1.15:8001';
var AppURL = 'https://api.itlab.mn';

Vue.config.productionTip = false
Vue.prototype.$appUrl = AppURL;
Vue.prototype.$axios = axios;

Vue.use(ElementUI, { locale });
Vue.use(Loading.directive);

const htmloptions = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    './plugins/print.css'
  ]
}
Vue.use(VueHtmlToPaper, htmloptions);
Vue.use(Popover);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
