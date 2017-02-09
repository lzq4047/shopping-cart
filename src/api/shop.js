import axios from '../axios.js'
import './mock.js'

export default {
  buyProducts: function (products, successCallback, failureCallback) {
    axios.post('/api/buy', {
      products: products
    }).then(response => {
      if (response.data.status) {
        successCallback()
      } else {
        failureCallback()
      }
    })
      .catch(error => {
        console.log(error)
        failureCallback()
      })
  },
  getProducts: function (successCallback) {
    axios.get('/api/getAllProducts')
      .then((response) => {
        successCallback(response.data)
      })
  }
}
