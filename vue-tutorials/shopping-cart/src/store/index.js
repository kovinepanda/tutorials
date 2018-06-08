import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },

  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }
  },

  actions: {
    fetchProducts({commit}){
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })

    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementItemQuantity', product)
      }
    }
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    decrementItemQuantity(state, product) {
      product.inventory--
    }


  }
})
