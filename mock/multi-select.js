const Mock = require('mockjs')
const Random = Mock.Random
const { 
  isEmpty,
  getArrRandomCount
} = require('./utils')

function genOneItem(index) {
  return Mock.mock({
    id: '@increment',
    name: '@sentence(10, 20)',
    area: `area_${index + 1}`,
    second_area: `second_area_${index + 1}`,
    service: `service_${index + 1}`
  })
} 

const positionList = ((len) => {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(genOneItem(i))
  }
  return list
})(count = 5)


module.exports = [
  {
    // 表格列表
    url: /\/position\/list/,
    type: 'get',
    response: config => {
      console.log('====================================');
      console.log(positionList);
      return {
        code: 20000,
        data: {
          total: positionList.length,
          list: positionList
        }
      }
    }
  },
  {
    url: /\/position\/[0-9]+/,
    type: 'get',
    response: config => {
      console.log(config.url)
      const id = config.url.split('/position/')[1] || ''
      let detail = ''
      for(const item of positionList) {
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
    url: /\/position\/list/,
    type: 'post',
    response: config => {
      const body = config.body
      const baseGoods = genOneItem()
      const item = Object.assign(baseGoods, body)
      positionList.push(item)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: /\/position\/list/,
    type: 'put',
    response: config => {
      const body = config.body
      let index = ''
      const item = positionList.find((item, i) => {
        if(item.id === +body.id) {
          index = i
          return item
        }
      })
      const updateItem = Object.assign(item, body)
      positionList.splice(index, 1, updateItem)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    // 大区选项
    url: /\/position\/area\/options/,
    type: 'get',
    response: () => {
      const areaList = [...new Array(6)].map((_, i) => {
        return {
          id: Random.increment(1000),
          name: `area_${i+1}`
        }
      })

      return {
        code: 20000,
        data: {
          list: areaList
        }
      }
    }
  },
  {
    // 二级大区选项
    url: /\/position\/second-area\/options/,
    type: 'get',
    response: () => {
      const areaList = [...new Array(3)].map((_, i) => {
        return {
          id: Random.increment(2000),
          name: `sec_area_${i+1}`
        }
      })

      return {
        code: 20000,
        data: {
          list: areaList
        }
      }
    }
  },
  {
    // 服务选项
    url: /\/position\/service\/options/,
    type: 'get',
    response: () => {
      const serviceList = [...new Array(5)].map((_, i) => {
        return {
          id: Random.increment(1000),
          name: `service_${i+1}`
        }
      })

      return {
        code: 20000,
        data: {
          list: serviceList
        }
      }
    }
  }
]
