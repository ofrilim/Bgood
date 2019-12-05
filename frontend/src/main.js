import Vue from 'vue'
import VueBus from 'vue-bus';
import App from './App.vue'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'


// Styles
import './styles/global.scss';

Vue.config.productionTip = false
Vue.use(SequentialEntrance);
Vue.use(ElementUI);
Vue.use(VueBus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






