export const cartProducts = state => {
  return state.cart.added.map(({id, quantity}) => {
    const record = state.products.all.find(product => product.id === id)
    return {
      id: record.id,
      title: record.title,
      price: record.price,
      quantity: quantity
    }
  })
}
