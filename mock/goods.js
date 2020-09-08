const Mock = require('mockjs')
const { 
  isEmpty,
  getArrRandomCount
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

const brandList = ['OBBO', 'WE', 'ME'].map((item, index) => {
  return {
    id: index + 1,
    name: item
  }
})

const brandProduct = [
  {
    id: 1,
    name: '横幅'
  },
  {
    id: 8,
    name: '原生'
  },
  {
    id: 16,
    name: '信息流广告'
  },
  {
    id: 32,
    name: 'PMP'
  },
  {
    id: 64,
    name: '插屏'
  },
  {
    id: 128,
    name: '搜索直达'
  }
]

const productList = brandList.map(item => {
  return {
    id: item.id,
    name: item.name,
    children: getArrRandomCount(brandProduct)
  }
})

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
  {
    // 品牌选项
    url: /\/goods\/brand\/options/,
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          list: brandList
        }
      }
    }
  },
  {
    // 产品选项
    url: /\/goods\/product\/options/,
    type: 'get',
    response: config => {

      // 下面是获取列表
      const { id } = config.query
      let productItem = {}
      productItem = productList.find(item => item.id === +id)

      return {
        code: 20000,
        data: {
          list: Object.keys(productItem).length === 0 ? {} : productItem.children
        }
      }
    }
  },
]
