// 是否使用mock
const isUseMock = true

module.exports = {

  title: 'my-admin',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {boolean} true | false
   * @description 是否使用mock, 只在开发环境使用
   */
  isUseMock: process.env.NODE_ENV === 'development' && isUseMock
}
