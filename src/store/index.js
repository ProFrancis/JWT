import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    payload: [],
    token: [],
    contact: []
  },
  mutations: {
    AUTH_POST_SUCCESS(state, data){
      state.payload.push(data.payload)
      state.token.push(data.accessToken)
    },
    AUTH_SUCCESS(state, data){
      state.payload = data.payload
      state.token = data.accessToken
    },
    AUTH_LOGOUT_SUCCESS(state){
      state.token = []
    },
    MUT_POST_CONTACT_SUCCESS(state, data){
      state.contact.result.push(data)
    },
    MUT_GET_CONTACT_SUCCESS(state, data){
      state.contact = data
    }
  },
  actions: {
    ACTION_POST({commit}, data){
      commit('AUTH_POST_SUCCESS', data)
    },
    ACTION_POST_CONTACT({commit}, data){
      commit('MUT_POST_CONTACT_SUCCESS', data)
    },
    ACTION_GET_CONTACT({commit}, data){
      commit('MUT_GET_CONTACT_SUCCESS', data)
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
    user: (state) => state.payload,
    contacts: (state) => state.contact
  }
})