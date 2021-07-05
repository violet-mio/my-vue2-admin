const Mock = require('mockjs')
const {
  isEmpty,
  getArrRandomItem,
  SUCCESS_CODE
} = require('./utils')

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
    type_id: 3,
    type_name: '开屏'
  }
]

// 广告规格
const adSpecList = [
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
  const adSpecItem = adSpecList.find(v => v.type_id === adTypeItem.type_id) || { spec_id: '', spec_name: '' }

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
    url: /\/complex-form-demo\/list[?].+/,
    type: 'get',
    response: config => {
      // 下面是获取列表
      const { id, name, page, limit } = config.query

      // 条件筛选
      const mockList = complexFormDemoList.filter(item => {
        if (!isEmpty(id) && item.id !== +id) return false
        if (!isEmpty(name) && item.name !== name) return false
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
        code: SUCCESS_CODE,
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: /\/complex-form-demo\/detail/,
    type: 'get',
    response: config => {
      const { id } = config.query
      let detail = ''
      for (const item of complexFormDemoList) {
        if (+item.id === +id) {
          detail = item
        }
      }

      return {
        code: SUCCESS_CODE,
        data: detail
      }
    }
  },
  {
    url: /\/complex-form-demo\/add/,
    type: 'post',
    response: config => {
      const body = config.body
      const baseForm = generateOneComplexForm()
      const item = Object.assign(baseForm, body)
      item.type_name = adTypeList.find(v => v.type_id === item.type_id).type_name
      item.spec_name = adSpecList.find(v => v.spec_id === item.spec_id).spec_name
      complexFormDemoList.unshift(item)

      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  {
    url: /\/complex-form-demo\/update/,
    type: 'put',
    response: config => {
      const body = config.body
      let index = ''
      const item = complexFormDemoList.find((item, i) => {
        if (item.id === +body.id) {
          index = i
          return item
        }
      })
      const updateItem = Object.assign(item, body)
      updateItem.type_name = adTypeList.find(v => v.type_id === updateItem.type_id).type_name
      updateItem.spec_name = adSpecList.find(v => v.spec_id === updateItem.spec_id).spec_name
      complexFormDemoList.splice(index, 1, updateItem)

      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  {
    url: /\/complex-form-demo\/adtype\/options/,
    type: 'get',
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: { ...adTypeList }
        }
      }
    }
  },
  {
    url: /\/complex-form-demo\/adspec\/options/,
    type: 'get',
    response: config => {
      const { type_id } = config.query
      const specOptions = adSpecList.filter(v => v.type_id === +type_id)
      return {
        code: SUCCESS_CODE,
        data: {
          list: specOptions
        }
      }
    }
  }
]
