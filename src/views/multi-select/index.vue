<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="12" :offset="0"></el-col>
    </el-row>
      
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="name">
      </el-table-column>
      <el-table-column
        prop="area"
        label="大区">
      </el-table-column>
      <el-table-column
        prop="second_area"
        label="二级区域">
      </el-table-column>
      <el-table-column
        prop="service"
        label="服务器">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    
    </el-table>
  </div>
</template>

<script>
  import { getPositionList } from '@/api/multi-select';
  export default {
    name: 'MultiSelectList',
    data() {
      return {
        list: []
      }
    },
    created () {
      this.getList()
    },
    activated() {
      if (this.$route.query.flush) {
        console.log('flush' + this.$route.query.flush);
        this.getList()
      }
    },
    methods: {
      getList() {
        getPositionList()
        .then(res => {
          console.log(res);
          this.list = res.data.list
        })
      },
      handleAdd() {
        this.$router.push({ name: 'AddMultiSelectDetail' })
      },
      handleEdit(row) {
        this.$router.push({ name: 'EditMultiSelectDetail', query: { id: row.id } })
      }
    },
  }
</script>

