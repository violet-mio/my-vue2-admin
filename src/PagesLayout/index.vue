<template>
  <div class="page-wrapper">
    <div class="page-container">
      <PageHeader />
      <!-- 首页 -->
      <main>
        <!-- 主要内容区域 -->
        <slot name="main" />
      </main>
      <PageFooter />
    </div>
  </div>
</template>
<script>
import PageHeader from './Header'
import PageFooter from './Footer'

export default {
  name: 'PagesLayout',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

$containerWidth: 1200px;
.page-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f4f5f5;

  .page-container {
    padding: 0;
    margin: 0 auto;

    main {
      min-height: 400px;
      width: $containerWidth;
      padding: 0 16px;
      margin: 20px auto 0;
    }
  }
}
</style>
