import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    MUT_POST(state, user){
      state.users.push(user)
    },
    MUT_GET(state, user){
      state.users = user
    },
  },
  actions: {
    ACTION_POST({commit}, data){
      commit('MUT_POST', data)
    },
    ACTION_GET({commit}, data){
      commit('MUT_GET', data)
    },
  },
})