const Mock = require('mockjs')

const tableList = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    // url: '/vue-admin-template/table/list',
    url: /\/vue-admin-template\/table\/list[?].+/,
    type: 'get',
    response: config => {
      const items = tableList.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: /\/vue-admin-template\/table\/list\/[0-9]+/,
    type: 'get',
    response: config => {
      console.log(config.url)
      const id = config.url.split('/vue-admin-template/table/list/')[1] || ''
      console.log(`id => ${id}`)
      let detail = ''
      const items = tableList.items

      for(const item of items) {
        if(+item.id === +id) {
          detail = item
        }
      }

      return {
        code: 20000,
        data: detail
      }
    }
  },
  {
    // 操作
    url: /\/vue-admin-template\/table\/list\/[0-9a-zA-z]+\/update/,
    type: 'put',
    response: config => {
      const id = config.url.split('/vue-admin-template/table/list/')[1]
      console.log(`id => ${id}`)
      let detail = null
      const items = tableList.items
      for(const item of items) {
        if(+item.id === +id) {
          detail = item
        }
      }
      console.log(config)
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
