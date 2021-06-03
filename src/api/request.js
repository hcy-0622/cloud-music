import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 30000

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
