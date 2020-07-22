<template>
  <div class="app-container">
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
          {{ scope.$index }}
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
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
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

export default {
  components: {
    Pagination 
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
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

    }
  }
}
</script>
