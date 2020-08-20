const Mock = require('mockjs')
const { 
  isEmpty
} = require('./utils')

function genOneItem() {
  return Mock.mock({
    id: '@increment',
    name: '@sentence(10, 20)',
    'status|1': [0, 1, 2],
    price: '@integer(300, 5000)',
    display_time: '@datetime'
  })
} 

const goodsList = ((len) => {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(genOneItem())
  }
  return list
})(count = 5);

module.exports = [
  {
    // 表格列表
    url: /\/goods\/list[?].+/,
    type: 'get',
    response: config => {

      // 下面是获取列表
      const { id, name, status, page, limit } = config.query

      // 条件筛选
      let mockList = goodsList.filter(item => {
        if(!isEmpty(id) && item.id !== +id) return false
        if(!isEmpty(name) && item.name !== name) return false
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
    url: /\/goods\/list\/[0-9]+/,
    type: 'get',
    response: config => {
      console.log(config.url)
      const id = config.url.split('/goods/list/')[1] || ''
      let detail = ''
      for(const item of goodsList) {
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
    url: /\/goods\/list/,
    type: 'post',
    response: config => {
      const body = config.body
      const baseGoods = genOneItem()
      const item = Object.assign(baseGoods, body)
      goodsList.push(item)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: /\/goods\/list/,
    type: 'put',
    response: config => {
      const body = config.body
      let index = ''
      const item = goodsList.find((item, i) => {
        if(item.id === +body.id) {
          index = i
          return item
        }
      })
      const updateItem = Object.assign(item, body)
      goodsList.splice(index, 1, updateItem)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]
