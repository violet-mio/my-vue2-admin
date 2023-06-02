<template>
  <div class="select-table-wrapper">
    <el-table
      ref="multipleTable"
      v-loading="pageLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="onSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="ID"
        prop="id"
        width="120"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
    </el-table>
    <hr>

    <!-- 子模块 -->
    <el-card v-for="(selItem) in selectedList" :key="`card-${selItem.id}`">
      <h2>表格：{{ selItem.id }}</h2>
      <el-table
        :ref="`subTable-${selItem.id}`"
        :data="selItem.children"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="onSubSelectChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="Code"
          prop="code"
          width="120"
        />
        <el-table-column
          prop="title"
          label="标题"
          width="120"
        />
        <el-table-column
          prop="author"
          label="作者"
          width="120"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'

export default {
  name: 'SelectTable',
  data() {
    return {
      list: [],
      selectedList: [],
      selectedSubList: [],
      pageLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 子表格选择
    onSubSelectChange(val) {
      console.log('onSubSelectChange', val)
      this.selectedSubList = val
    },
    // 主表格选择
    onSelectionChange(val) {
      console.log('onSelectionChange', val)
      if (val.length === 0) {
        this.selectedList = []
        return
      }
      // 数据从原数据，避免顺序错乱
      const ids = val.map(item => item.id)
      this.selectedList = this.list.filter(item => ids.includes(item.id))
      // this.selectedList = val
      if (this.selectedList.length > 0) {
        this.$nextTick(() => {
          const keys = this.selectedList.map(item => `subTable-${item.id}`)
          console.log('keys', keys)
          keys.forEach(key => {
            const el = this.$refs[key]
            // 之前已经勾选过的，不再勾选
            if (el && el[0].selection.length === 0) {
              el && el[0].toggleAllSelection()
            } else {
              console.log('已经勾选过的，不再勾选')
            }
          })
        })
      }
    },
    getList() {
      this.pageLoading = true
      setTimeout(async() => {
        const total = 3
        const list = []
        for (let i = 0; i < total; i++) {
          const parentItem = Mock.mock({
            id: '@increment',
            name: '@ctitle',
            'checked|1': [true, false]
            // 'checked|1': [true]
          })

          // 生成子表格数据
          parentItem.children = new Array(total).fill(1).map(() => Mock.mock({
            parentId: parentItem.id,
            code: '@increment',
            title: '@ctitle',
            author: 'author-@title(0, 2)'
          }))
          list.push(parentItem)
        }
        this.list = list
        console.log('first list', this.list)
        this.pageLoading = false
        // 设置默认选中
        await this.$nextTick()
        this.$refs.multipleTable.toggleAllSelection()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
