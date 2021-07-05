<template>
  <div class="app-container">
    <el-form ref="listQueryRef" :model="listQuery" :inline="true" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="listQuery.name"
          placeholder="请输入名称"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button v-fast-click type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button v-fast-click icon="el-icon-refresh" @click="resetQuery">重置</el-button>
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
      <el-table-column label="ID" prop="id" width="95" align="center" />
      <el-table-column label="素材名称" prop="name" align="center" />
      <el-table-column label="广告类型" prop="type_name" align="center" />
      <el-table-column label="广告规格" prop="spec_name" align="center" />

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getComplexFormList } from '@/api/complex-form-demo'

export default {
  name: 'ComplexFormList',
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
  methods: {
    getList() {
      this.listLoading = true
      getComplexFormList(this.listQuery).then(response => {
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
      this.$router.push({ name: 'AddComplexForm' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditComplexForm', query: { id }})
    }
  }
}
</script>
