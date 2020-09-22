import Vue from 'vue'
import Vuex from 'vuex'

// ROUTES API 

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    MUT_POST(state, user){
      state.users.push(user)
    },
  },
  actions: {
    ACTION_POST({commit}, data){
      commit('MUT_POST', data)
    },
  },
})