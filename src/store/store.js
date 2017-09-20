import Vue from 'vue'
import Vuex from 'vuex'
// import * as type from './types.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state, payload) { // 加载中
      state.isLoading = payload.isLoading
    }
  }
})

export default store
