<template>
  <PagesLayout>
    <template v-slot:main>
      <p>测试信息页</p>
      <router-link to="/login">前往登录页面</router-link>
    </template>
  </PagesLayout>
</template>
<script>
import PagesLayout from '@/PagesLayout'

export default {
  name: 'HomeInfo',
  components: { PagesLayout },
  metaInfo: {
    title: '信息', // set a title
    meta: [{ // set meta
      name: '关键词2',
      content: '关键词内内容2'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  }
}
</script>
