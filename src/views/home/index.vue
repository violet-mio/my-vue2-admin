<template>
  <div>
    <p>欢迎登录</p>
    <el-button type="primary" @click="handleGoLogin">登录</el-button>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '测试首页', // set a title
    meta: [{ // set meta
      name: '关键词',
      content: '关键词内内容'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  methods: {
    handleGoLogin() {
      location.href = '/login'
    }
  }
}
</script>
