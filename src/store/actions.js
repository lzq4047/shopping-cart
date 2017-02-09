import * as types from './types.js'

export const addToCart = ({commit}, product) => {
  if (product.stock > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}

export const removeFromCart = ({commit, state}, product) => {
  if (product.quantity > 0) {
    let shopRecord = state.products.all.find(p => p.id === product.id)
    commit(types.REMOVE_FROM_CART, {
      cartProduct: product
    })
    commit(types.RECEIVE_PRODUCTS, {
      products: [shopRecord]
    })
  }
}
