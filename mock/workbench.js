const Mock = require('mockjs')
const Random = Mock.Random

const news = ((len = 50) => {
  const list = []
  for (let i = 0; i < len; i++) {
    // const name = Random.cname()
    list.push(Mock.mock({
      id: '@increment',
      avatar: Random.dataImage('100x100', Random.cname()),
      message: '@cparagraph(1, 10)'
    }))
  }
  return list
})()

module.exports = [
  {
    // 表格列表
    url: /\/workbench\/news/,
    type: 'get',
    response: config => {
      console.log('config', config)
      return {
        code: 20000,
        data: {
          total: news.length,
          list: news
        }
      }
    }
  }
]
