import Mock from 'mockjs'
import {baseURL} from '../axios.js'

Mock.mock(baseURL + '/api/getAllProducts', 'get', (() => {
  return Mock.mock({
    'products|5-20': [
      {
        'id': () => Mock.Random.increment(),
        'title': () => Mock.Random.title(),
        'price': () => Mock.mock('@float(10, 200)').toFixed(2),
        'quantity': () => Mock.Random.integer(0, 25)
      }
    ]
  }).products
})())

Mock.mock(baseURL + '/api/buy', 'post', {
  'status': () => Mock.Random.boolean()
})
