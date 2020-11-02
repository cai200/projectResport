import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login:{},

  },
  mutations: {

    setLogin(state, data){
      state.login = data

    }
  },
  actions:{

    setLogin({commit},obj){
      commit('setLogin',obj)
    }
  },
  getters: {

    startlogin(state){
      return state.login
    }
  }
});
export default store
