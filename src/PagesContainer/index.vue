<template>
  <div class="page-container">
    <header class="header">
      <h1 class="logo">
        <a href="/">
          <img :src="logoImg" alt="网站首页">
        </a>
      </h1>
      <ul class="nav">
        <li v-for="item in menuList" :key="item.id" class="nav-item" :class="{ 'active': activeMenu === item.path }">
          <router-link class="link" :to="item.path">{{ item.label }}</router-link>
        </li>
      </ul>
    </header>
    <main>
      <keep-alive>
        <slot />
        <router-view />
      </keep-alive>
    </main>
    <footer>
      Footer
    </footer>
  </div>
</template>
<script>
import logoImg from './page-logo.png'

export default {
  name: 'PagesContainer',
  data() {
    return {
      menuList: [
        {
          id: 1,
          label: '首页',
          path: '/'
        },
        {
          id: 2,
          label: '处理中心',
          path: '/home-info'
        }
      ],
      logoImg
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果meta设置激活菜单，就会高亮对应的菜单
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }

}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

  .page-container {
    width: 1140px;
    padding: 0;
    margin: 0 auto;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        width: 80px;
        height: 80px;
        margin: 0;
        font-size: 32px;
        font-weight: 400;

        a,
        img {
          width: 100%;
          height: 100%;
        }
      }

      .nav {
        display: flex;
        align-items: center;
        height: 100%;
        line-height: 80px;
        background: transparent;
        padding: 0;
        margin: 0;

        .nav-item {
          margin: 0;
          list-style: none;
          position: relative;

          .link {
            padding: 0 20px;
            text-decoration: none;
            cursor: pointer;
            color: #909090;
          }

          &:hover,
          &.active {
            .link {
              color: $menuActiveText;
            }
          }
        }
      }
    }
  }
</style>
