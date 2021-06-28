<template>
  <!-- <div><router-link to="/home-info">前往我的页面</router-link></div> -->
  <PagesContainerLayout>
    <router-link to="/home-info">前往我的页面</router-link>
  </PagesContainerLayout>
</template>
<script>

import PagesContainerLayout from '@/PagesContainer'
export default {
  name: 'Home',
  components: { PagesContainerLayout },
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
