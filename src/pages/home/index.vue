<template>
  <div>
    <div>这是首页</div>
    <router-link to="/home-info">前往我的页面</router-link>
  </div>
</template>
<script>

export default {
  name: 'Home',
  metaInfo: {
    title: '首页', // set a title
    meta: [{ // set meta
      name: '关键词',
      content: '关键词内内容'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  }
}
</script>
