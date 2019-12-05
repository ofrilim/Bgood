// main store
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
    // isOpenWishList: false
  },
  mutations: {
    // openWishList(state) {
    //   state.isOpenWishList = !state.isOpenWishList
    //   console.log('store, mutation: ',state.isOpenWishList)
    // }
  },
  actions: {
      setMsg(context, {msg}) {
        context.commit({type: 'setMsg', msg});
        setTimeout(() => context.commit({type: 'setMsg', msg: null}), 2500);
    },
  },
  getters: {
    // toggleWishList(state) {
    //   return state.isOpenWishList;
    // }
  },
  modules: {
    UserStore,
    ItemStore,
    SocketStore
  }
})
