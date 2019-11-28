import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Styles
import './styles/global.scss';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
