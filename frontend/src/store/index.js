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
    isOpenWishList: false
  },
  mutations: {
    openWishList(state) {
      state.isOpenWishList = !state.isOpenWishList
    }
  },
  getters: {
    open(state) {
      return state.isOpenWishList;
    }
  },
  modules: {
    UserStore,
    ItemStore,
    SocketStore
  }
})
