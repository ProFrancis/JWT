import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: [],
    token: []
  },
  mutations: {
    MUT_POST(state, data){
      state.user.push(data.user)
      state.token.push(data.accessToken)
    },
    AUTH_SUCCESS(state, data){
      state.user = data.user
      state.token = data.accessToken
    },
    AUTH_LOGOUT_SUCCESS(state){
      state.token = []
    }
  },
  actions: {
    ACTION_POST({commit}, data){
      commit('MUT_POST', data)
    },
    AUTH_REQUEST({commit}, data){
      commit('AUTH_SUCCESS', data)
    },
    AUTH_LOGOUT({commit} ){
      commit('AUTH_LOGOUT_SUCCESS')
    },
  },
  getters: {
    token: (state) => state.token,
    user: (state) => state.user
  }
})