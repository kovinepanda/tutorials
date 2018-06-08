import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    availableProducts(state, getters) {
      return state.items.filter(product => product.inventory > 0)
    },

    productsIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  mutations: {
    setProducts(state, payload) {
      state.items = payload
    },

    decrementItemQuantity(state, product) {
      product.inventory--
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
    }
  }
}
