module.exports = {
  presets: [
    '@vue/app',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  // 自动推断编译的模块类型，参考https://github.com/vuejs/vue-cli/issues/2746
  sourceType: 'unambiguous'
}
