import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },

  getters: {
    productsCount() {
     // ..
    }
  },

  actions: {
    fetchProducts(){
      //
    }
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload
    }
  }
})
