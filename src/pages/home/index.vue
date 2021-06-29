<template>
  <PagesLayout>
    <template v-slot:main>
      <div>这是首页</div>
      <router-link to="/home-info">前往我的页面</router-link>
    </template>
  </PagesLayout>
</template>
<script>
import PagesLayout from '@/PagesLayout'

export default {
  name: 'Home',
  components: { PagesLayout },
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
