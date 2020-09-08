<template>
  <div class="app-container">
    <el-form ref="listQueryRef" :model="listQuery" :inline="true" label-width="68px">
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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
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
          <el-button type="primary" @click="handleGoDetail(scope.row.id)">详情</el-button>
          <el-button type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getGoods } from '@/api/goods'

export default {
  name: 'GoodsList',
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
      }
    }
  },
  created() {
    this.getList()
  },
  activated() {
    if (this.$route.query.flush) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getGoods(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs['listQueryRef'].resetFields()
      this.handleSearch()
    },
    handleAdd() {
      console.log('add')
      this.$router.push({ name: 'AddGoods' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditGoods', query: { id }})
    }
  }
}
</script>

