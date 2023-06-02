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
        row-key="code"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="(val) => onSubSelectChange(val, selItem)"
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
      selectedSubObj: {},
      pageLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 子表格选择
    onSubSelectChange(val, selItem) {
      console.log('onSubSelectChange', val)
      // 每个子表格分别存储
      if (this.selectedSubObj[selItem.id]) {
        this.selectedSubObj[selItem.id] = val
      } else {
        this.selectedSubObj[selItem.id] = [...val]
      }
    },
    // 主表格选择
    onSelectionChange(val) {
      console.log('onSelectionChange', val)
      // 数据从原数据，避免顺序错乱
      const ids = val.map(item => item.id)
      this.selectedList = this.list.filter(item => ids.includes(item.id))
      if (this.selectedList.length > 0) {
        this.$nextTick(() => {
          // 更新selectedSubObj，如果某一项主表格被取消勾选，移除selectedSubObj中的数据
          if (Object.keys(this.selectedSubObj).length) {
            const ids = this.selectedList.map(item => item.id)
            for (const parentId in this.selectedSubObj) {
              console.log('selectedSubObj parentId', parentId)
              console.log('ids', ids)
              // 如果selectedSubObj中的key不在ids中，移除
              // 注意selectedSubObj的键是字符串，ids里面是数字, 所以要转换
              if (!ids.includes(+parentId)) {
                delete this.selectedSubObj[parentId]
              }
            }
          }

          // 处理子表格选中
          this.selectedList.forEach(parent => {
            const refName = `subTable-${parent.id}`
            const subTableEl = this.$refs[refName]
            // 如果子表格没有选中项，且selectedSubObj中没有该项，全选
            if (subTableEl && subTableEl[0].selection.length === 0) {
              const exist = this.selectedSubObj[parent.id]
              const isSelAll = subTableEl && subTableEl[0] && !exist
              if (isSelAll) {
                subTableEl[0].toggleAllSelection()
              }
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
