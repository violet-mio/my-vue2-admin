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
})(count = 5)

const brandList = ['OBBO', 'WE', 'ME'].map((item, index) => {
  return {
    id: index + 1,
    name: item
  }
})

// 广告类型
const adTypeList = [
  {
    type_id: 1,
    type_name: '横幅'
  },
  {
    type_id: 2,
    type_name: '信息流'
  },
  {
    type_id: 4,
    type_name: '开屏'
  }
]

// 广告规格
const adSpec = [
  { type_id: 1, spec_id: 1, spec_name: '图片' },
  { type_id: 2, spec_id: 2, spec_name: '信息流大图' },
  { type_id: 2, spec_id: 3, spec_name: '信息流小图' },
  { type_id: 2, spec_id: 4, spec_name: '信息流组图' },
  { type_id: 2, spec_id: 5, spec_name: '信息流视频' },
  { type_id: 3, spec_id: 6, spec_name: '横屏开屏' },
  { type_id: 3, spec_id: 7, spec_name: '竖屏开屏' }
]

// 生成一项APP
function generateOneComplexForm() {
  const adTypeItem = getArrRandomItem(adTypeList)
  const adSpecItem = adSpec.find(v => v.type_id === adTypeItem.type_id) || { spec_id: '', spec_name: '' }

  return Mock.mock({
    id: '@increment',
    name: '@ctitle',
    type_id: adTypeItem.type_id,
    type_name: adTypeItem.type_name,
    spec_id: adSpecItem.spec_id,
    spec_name: adSpecItem.spec_name
  })
}

const complexFormDemoList = ((len = 50) => {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(generateOneComplexForm())
  }
  return list
})()

module.exports = [
  {
    // 表格列表
    url: /\/goods\/list[?].+/,
    type: 'get',
    response: config => {
      // 下面是获取列表
      const { id, name, status, page, limit } = config.query

      // 条件筛选
      const mockList = goodsList.filter(item => {
        if (!isEmpty(id) && item.id !== +id) return false
        if (!isEmpty(name) && item.name !== name) return false
        if (!isEmpty(status) && item.status !== +status) return false
        return true
      })

      // 分页查询
      const pageList = mockList.filter((item, index) => {
        if (index < limit * page && index >= limit * (page - 1)) {
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
  }
]
