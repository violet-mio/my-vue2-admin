const Mock = require('mockjs')

let range = {
  started_at: '',
  ended_at: ''
}

let list = []

module.exports = [
  {
    url: /\/date\/list/,
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: JSON.parse(JSON.stringify(range))
      }
    }
  },
  {
    url: /\/date/,
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: JSON.parse(JSON.stringify(range))
      }
    }
  },
  {
    url: /\/date/,
    type: 'post',
    response: config => {
      const body = config.body
      range = Object.assign(range, body)
      list.push(range)
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: /\/date/,
    type: 'put',
    response: config => {
      const body = config.body
      range = Object.assign(range, body)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]