import * as types from '../types.js'
import shop from '../../api/shop.js'

const state = {
  added: [],
  checkoutStatus: null
}

const getters = {
  checkoutStatus: state => state.checkoutStatus
}

const actions = {
  checkout: function ({commit, state}, products) {
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(products, () => {
      commit(types.CHECKOUT_SUCCESS)
    }, () => {
      commit(types.CHECKOUT_FAILURE, { savedCartItems })
    })
  }
}

const mutations = {
  [types.ADD_TO_CART] (state, {id}) {
    state.checkoutStatus = null
    const record = state.added.find(product => product.id === id)
    if (record) {
      record.quantity++
    } else {
      state.added.push({
        id: id,
        quantity: 1
      })
    }
  },
  [types.CHECKOUT_REQUEST] (state) {
    state.added = []
    state.checkoutStatus = null
  },
  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'success'
  },
  [types.CHECKOUT_FAILURE] (state, {savedCartItems}) {
    state.added = savedCartItems
    state.checkoutStatus = 'error'
  },
  [types.REMOVE_FROM_CART] (state, {cartProduct}) {
    let cartRecord = state.added.find(p => p.id === cartProduct.id)
    if (!--cartRecord.quantity) {
      let cartRecordIndex = state.added.findIndex(p => p.id === cartProduct.id)
      state.added.splice(cartRecordIndex, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
