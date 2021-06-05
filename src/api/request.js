import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 15000

let count = 0
axios.interceptors.request.use(config => {
  Vue.showLoading()
  count++
  return config
}, e => {
  Vue.hideLoading()
  return Promise.reject(e)
})
axios.interceptors.response.use(response => {
  count--
  if (count === 0) {
    Vue.hideLoading()
  }
  return response
}, e => {
  Vue.hideLoading()
  return Promise.reject(e)
})

export default {
  get: (url = '', params = {}) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, {
          params
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    }),
  post: (url = '', data = {}) => new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  }),
  all: (list) => new Promise((resolve, reject) => {
    axios.all(list).then(axios.spread((...res) => resolve(res))).catch(e => reject(e))
  })
}
