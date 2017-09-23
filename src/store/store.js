import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './types.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLoading: false,
    doctor: '',
    timer: []
  },
  getters: {
    timer: state => {
      return state.timer
    }
  },
  mutations: {
    updateLoadingStatus(state, payload) { // 加载中
      state.isLoading = payload.isLoading
    },
    [type.DOCTOR](state, payload) {
      state.doctor = payload.doctor
    },
    [type.TIMER](state, payload) {
      state.timer = payload.timer
    }
  }
})

export default store
