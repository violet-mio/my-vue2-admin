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

const areaList = [...new Array(6)].map((_, i) => {
  return {
    id: Random.increment(1000),
    name: `area_${i+1}`
  }
})

const sec_area_obj = (() => {
  const map = new Map()
  const areaLength = areaList.length
  for (let i = 0; i < areaLength; i++) {
    const area = areaList[i]
    const id = area.id
    const sec_len = i + 1
    for (let j = 0; j < sec_len; j++) {
      if(!map.has(id)) {
        map.set(id, [])
      }
      const value = map.get(id)
      value.push({
        id: Random.increment(2000),
        name: `sec_area_${sec_len}_${j+1}`
      })
      map.set(id, value)
    }
  }

  const getSecAreasByParentId = parentId => {
    if(map.has(parentId)) {
      return map.get(parentId)
    }
  }
  return {
    map,
    getSecAreasByParentId
  }
})()
const all_sec_areas = [...sec_area_obj.map.values()].reduce((prev, cur) => {
  return [...prev, ...cur]
}, [])

const service_obj = (() => {
  const map = new Map();
  [...new Array(all_sec_areas.length)].map((_, index) => {
    const id = all_sec_areas[index].id
    const len = index + 1
  
    for (let i = 0; i < len; i++) {
      if(!map.has(id)) {
        map.set(id, [])
      }
      const value = map.get(id)
      value.push({
        id: Random.increment(2000),
        name: `service_${id}_${i+1}`
      })
      map.set(id, value)
    }
  })
  const getServicesByParentId = parentId => {
    if(map.has(parentId)) {
      return map.get(parentId)
    }
  }
  return {
    map,
    getServicesByParentId
  }
})()

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
    response: config => {
      const { id } = config.query
      const { getSecAreasByParentId, map } = sec_area_obj
      if(isEmpty(id)) {
        return {
          code: 401,
          data: {
            list: []
          }
        }
      }
      return {
        code: 20000,
        data: {
          list: getSecAreasByParentId(+id) || []
        }
      }
    }
  },
  {
    // 服务选项
    url: /\/position\/service\/options/,
    type: 'get',
    response: config => {
      const { id } = config.query
      const { getServicesByParentId } = service_obj
      if(isEmpty(id)) {
        return {
          code: 401,
          data: {
            list: []
          }
        }
      }
      return {
        code: 20000,
        data: {
          list: getServicesByParentId(+id) || []
        }
      }
    }
  }
]
