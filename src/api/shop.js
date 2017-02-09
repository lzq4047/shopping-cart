import Mock from 'mockjs'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
const BASE_URL = 'http://localhost:8080'
Mock.mock(BASE_URL + '/api/getAllProducts', 'get', (() => {
  return Mock.mock({
    'products|5-20': [
      {
        'id': function () {
          return Mock.Random.increment()
        },
        'title': function () {
          return Mock.Random.title()
        },
        'price': function () {
          return Mock.mock('@float(10, 200)').toFixed(2)
        },
        'quantity': function () {
          return Mock.Random.integer(0, 25)
        }
      }
    ]
  }).products
})())

Mock.mock(BASE_URL + '/api/buy', 'post', {
  'status': () => {
    return Mock.Random.boolean()
  }
})

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
