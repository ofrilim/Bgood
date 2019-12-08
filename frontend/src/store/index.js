// MAIN STORE
import Vue from 'vue'
import Vuex from 'vuex'

import UserStore from '../modules/UserStore.js'
import ItemStore from '../modules/ItemStore.js'
import SocketStore from '../modules/SocketStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
      msg: '',
  },
  mutations: {
    setMsg(state, { msg }) {
      state.msg = msg;
    }
  },
  actions: {
      setMsg(context, { msg }) {      // TODO: CHECK ABOUT ALL PLACES WE HAVE msg AND COME TO STORE and this one paryicular dont have mutation
        console.log('MSG IN STORE. MSG: ', msg)
        context.commit({ type: 'setMsg', msg });
        setTimeout(() => context.commit({ type: 'setMsg', msg: null }), 2500);
    },
  },
  getters: {
    msg(state) {
      return state.msg
    }
  },
  modules: {
    UserStore,
    ItemStore,
    SocketStore
  }
})
