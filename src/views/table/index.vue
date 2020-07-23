<template>
  <div class="app-container">
    <el-form :model="listQuery" ref="listQueryRef" :inline="true" label-width="68px">
      <el-form-item label="ID" prop="id">
        <el-input
          v-model="listQuery.id"
          placeholder="请输入ID"
          clearable
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="listQuery.title"
          placeholder="请输入标题"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="listQuery.status" placeholder="文章状态" clearable>
          <el-option
            v-for="articleOptionsItem in articleStatusOptions"
            :key="articleOptionsItem.id"
            :label="articleOptionsItem.name"
            :value="articleOptionsItem.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="action" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="getDetail(scope.row.id)">获取详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="action" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateTableInfo(scope.row.id)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getTableList, getTableDetail, updateTable } from '@/api/table'
import Pagination from '@/components/Pagination'
import { articleStatus, articleStatusMap, articleStatusOptions } from './options'

export default {
  components: {
    Pagination
  },
  filters: {
    statusTagFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      return articleStatusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        id: '',
        title: '',
        status: articleStatus.PUBLISHED,
        author: undefined
      },
      articleStatusOptions
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTableList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        console.log(response)
      })
    },
    getDetail(id) {
      getTableDetail({ id }).then(res => {
        console.log('获取详情成功')
        console.log(res)
      }).catch(res => {
        console.log('获取详情失败')
        console.log(res)
      })
    },
    updateTableInfo(id) {
      updateTable({ id }).then(res => {
        console.log('更新详情成功')
        console.log(res)
      }).catch(res => {
        console.log('更新详情失败')
        console.log(res)
      })
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs['listQueryRef'].resetFields()
      this.handleSearch();
    },
    handleAdd() {
      console.log('add')  
    },
    handleUpdate() {
      console.log('Update')  
    },
    handleExport() {
      console.log('Export')  
    },
  }
}
</script>
