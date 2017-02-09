import * as types from '../types.js'
import shop from '../../api/shop.js'
const state = {
  all: []
}

const getters = {
  allProducts: state => state.all
}

const actions = {
  getAllProducts: function ({commit}) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, {products})
    }, error => {
      console.log(error)
    })
  }
}

const mutations = {
  [types.RECEIVE_PRODUCTS] (state, {products}) {
    products = products.map((product) => {
      let record = state.all.find(p => p.id === product.id)
      if (record) {
        record.stock = product.quantity ? (product.quantity + record.stock) : (record.stock + 1)
        let recordIndex = state.all.indexOf(record)
        state.all.splice(recordIndex, 1)
        return record
      } else {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          stock: product.quantity || product.stock
        }
      }
    })
    state.all = [...state.all, ...products].sort((pre, current) => pre.id - current.id)
    // console.log(state.all)
  },
  [types.ADD_TO_CART] (state, {id}) {
    state.all.find(product => product.id === id).stock--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
