<template>
  <div class="app-container">
    <el-form ref="listQueryRef" v-loading="queryLoading" :model="listQuery" :inline="true" label-width="68px">
      <el-form-item label="请输入数字" prop="title" label-width="100px">
        <el-input
          v-model="listQuery.num"
          placeholder="请输入数字"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-refresh" @click="queryNumResult">查询数字</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: 'PromiseDemo',
  data() {
    return {
      queryLoading: false,
      listQuery: {
        num: ''
      }
    }
  },
  methods: {
    mockReq(numstr) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const num = parseInt(numstr)
          if (isNaN(num)) {
            reject('不是数字')
          } else {
            resolve(num + 1)
          }
        }, 1000)
      })
    },
    async queryNumResult() {
      this.queryLoading = true
      const first = await this.mockReq(this.listQuery.num)
        .catch(err => {
          // console.log('first err:', err)
          this.$message({ message: err || '系统未知异常', type: 'error' })
          // 中断后面代码, return Promise.reject或throw一个错误对象
          return Promise.reject(err)
          // throw new Error(err)
        })
        .finally(() => {
          this.queryLoading = false
        })
      console.log('first ok:', first)
      const second = await this.mockReq(2)
      console.log('second ok:', second)
      console.log('end')
    }
  }
}
</script>

