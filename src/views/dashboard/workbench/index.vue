<template>
  <div class="dashboard-container">
    <el-row class="user-info" type="flex" align="middle">
      <el-col :span="2">
        <img class="avatar" :src="avatar">
      </el-col>
      <el-col :span="6" :offset="1">
        <h2>欢迎！</h2>
        <div class="username">用户名: {{ name }}</div>
      </el-col>
    </el-row>

    <div class="content-wrap">
      <div class="center">
        <el-card>
          <div slot="header">项目变化</div>
          <ul class="news">
            <li v-for="newsItem in news" :key="newsItem.id" class="news-item hover-shadow">
              <div class="author-avatar">
                <img :src="newsItem.avatar">
              </div>
              <div class="info">{{ newsItem.message }}</div>
            </li>
          </ul>
        </el-card>
      </div>
      <div class="right">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">快捷导航</div>
          <div class="quick-wrap">
            <div v-for="(quickItem) in quickData" :key="quickItem.id" class="quick-wrap-item hover-shadow" shadow="hover">
              <svg-icon :icon-class="quickItem.icon" :style="{ color: quickItem.color }" />
              <span class="title">{{ quickItem.title }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWorkbenchNews } from '@/api/workbench'

export default {
  name: 'Workbench',
  data() {
    return {
      quickData: [
        { id: 100, title: '首页', icon: 'dashboard', color: '#41b27f' },
        { id: 101, title: '系统设置', icon: 'dashboard', color: '#1a6ce9' },
        { id: 102, title: '组件', icon: 'dashboard', color: '#e18527' },
        { id: 103, title: '图表', icon: 'chart', color: '#73c04d' },
        { id: 104, title: '权限管理', icon: 'dashboard', color: '#ffbb5b' },
        { id: 105, title: '用户管理', icon: 'user', color: '#1a6ce9' }
      ],
      news: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
    getWorkbenchNews()
      .then(res => {
        // console.log(res)
        this.news = res.data.list
      })
  }
}
</script>

<style lang="scss" scoped>
.hover-shadow {
  transition: .3s;
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
}

.dashboard-container {
  .user-info {
    background-color: #fff;
    padding: 20px 26px;
    .avatar {
      max-width: 80px;
      border-radius: 50%;
    }
    .username {
      font-size: 20px;
      line-height: 46px;
    }
  }

  .content-wrap {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .center {
      flex: 1;
      min-width: 600px;
      margin-right: 20px;

      .news {
        list-style: none;
        padding: 0 20px;
        margin: 0;

        .news-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 20px;
          padding: 20px;
          border-bottom: 1px solid #f0f0f0;

          .author-avatar {
            max-width: 40px;
            margin-right: 16px;
            img {
              width: 100%;
              border-radius: 50%;
              height: 100%;
            }
          }
        }
      }
    }

    .right {
      width: 300px;
      .quick-wrap {
        padding: 0;
        display: flex;
        min-width: 300px;
        flex-wrap: wrap;
        .quick-wrap-item {
          padding: 30px 10px;
          width: 33.3%;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #ebeef5;
          .title {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
