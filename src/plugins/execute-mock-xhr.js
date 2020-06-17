/**
 * 如果你想使用mock api，可以运行mockXHR()
 * 注意：当前mockXHR模拟数据请求仅在生产环境，请在上线之前移除掉
 */

if (process.env.NODE_ENV === 'production') {
  console.log('user mock at production env');
  const { mockXHR } = require('../../mock')
  mockXHR()
}