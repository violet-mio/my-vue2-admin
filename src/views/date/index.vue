<template>
  <div>
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
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.started_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.ended_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getDateList } from '@/api/date'
  export default {
    name: 'DateList',
    data() {
      return {
        list: [],
        loading: false
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
        this.loading = true
        getDateList()
        .then(res => {
          this.list = res.data.list
        })
        .finally(() => {
          this.loading = false
        })
      },
      handleAdd() {
        this.$router.push({ name: 'AddDate' })
      },
      handleEdit(row) {
        this.$router.push({ name: 'EditDate', query: { id: row.id } })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>