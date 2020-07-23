const Mock = require('mockjs')
const { 
  isEmpty
} = require('./utils')

const tableList = ((len) => {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(Mock.mock({
      id: '@increment',
      title: '@sentence(10, 20)',
      'status|1': [0, 1, 2],
      author: 'author-@title(0, 2)',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
    }))
  }
  return list
})(count = 50);

module.exports = [
  {
    // url: '/vue-admin-template/table/list',
    // 表格列表
    url: /\/vue-admin-template\/table\/list[?].+/,
    type: 'get',
    response: config => {

      // 下面是获取列表
      const { id, title, status, author, page, limit } = config.query
      console.log({ id, title, status, author, page, limit })

      // 条件筛选
      let mockList = tableList.filter(item => {
        if(!isEmpty(id) && item.id !== +id) return false
        if(!isEmpty(title) && item.title !== title) return false
        if(!isEmpty(author) && item.author !== author) return false
        if(!isEmpty(status) && item.status !== +status) return false
        return true
      })

      // 分页查询
      const pageList = mockList.filter((item, index) => {
        if( index < limit * page && index >= limit * (page -1) ) {
          return true
        }
        return false
      })

      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList
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
      for(const item of tableList) {
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
      for(const item of tableList) {
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
