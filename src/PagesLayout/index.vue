<template>
  <div class="page-wrapper">
    <div class="page-container">
      <header class="header">
        <div class="container">
          <h1 class="logo">
            <router-link to="/">
              <img :src="logoImg" alt="网站首页">
            </router-link>
          </h1>
          <ul class="nav">
            <li v-for="item in menuList" :key="item.id" class="nav-item" :class="{ 'active': isActive(item) }">
              <router-link class="link" :to="item.path">{{ item.label }}</router-link>
            </li>
            <li class="nav-item action-conter">
              <el-dropdown v-if="token" trigger="click">
                <div class="el-dropdown-link">
                  <img src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/3d4456d29fa60c097698e56c1c180126~300x300.image" alt="头像" class="avator">
                </div>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/dashboard">
                    <el-dropdown-item icon="el-icon-s-home">后台中心</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <router-link v-else to="/login">
                <el-button type="primary" size="medium" plain>登录</el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <router-view />
      </main>
      <footer>
        Footer
      </footer>
    </div>
  </div>
</template>
<script>
import logoImg from './page-logo.png'
import { mapGetters } from 'vuex'

export default {
  name: 'PagesLayout',
  data() {
    return {
      menuList: [
        {
          id: 1,
          label: '首页',
          path: '/home',
          alias: ['/']
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
    ...mapGetters([
      'token'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果meta设置激活菜单，就会高亮对应的菜单
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    isActive(item) {
      return this.activeMenu === item.path ||
      (Array.isArray(item.alias) && item.alias.includes(this.activeMenu))
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.page-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f4f5f5;

  .page-container {
    padding: 0;
    margin: 0 auto;
    $containerWidth: 1200px;

    .header {
      background-color: #fff;
      .container {
        max-width: $containerWidth;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

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
            transform: scale(0.8);
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

          .action-conter {
            display: flex;
            align-items: center;
            justify-content: center;
            .el-dropdown-link {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              &:hover {
                color: $menuActiveText;
              }
              .avator {
                display: inline-block;
                vertical-align: middle;
                height: 30px;
                border-radius: 50%;
              }
            }
            .el-icon-arrow-down {
              font-size: 12px;
            }
            .el-dropdown-menu {
              a {
                display: inline-block;
              }
            }
          }
        }
      }
    }

    main {
      min-height: 200px;
      width: $containerWidth;
      padding: 0 16px;
      margin: 20px auto 0;
    }

    footer {
      width: $containerWidth;
      margin: 20px auto 0;
    }
  }

}
</style>
