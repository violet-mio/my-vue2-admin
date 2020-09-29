<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="started_at"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="ended_at"
        label="结束时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getDateList } from '@/api/getDateList';
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      getList() {
        getDateList()
        .then(res => {
          this.list = res.data.list
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>