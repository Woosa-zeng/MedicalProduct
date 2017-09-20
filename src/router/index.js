import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: (resolve) => {
        require(['@/components/Search/Search.vue'], resolve)
      }
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: (resolve) => {
        require(['@/components/Quiz/Quiz.vue'], resolve)
      }
    }
  ]
})
router.beforeEach(function(to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})
router.afterEach(function(to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
