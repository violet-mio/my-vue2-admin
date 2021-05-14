<template>
  <div>
    <el-button type="primary" @click="updateSeries">拉取数据</el-button>
    <div v-loading="loading" id="line-charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineCharts',
  data() {
    return {
      myChartIns: null,
      loading: false
    }
  },
  mounted() {
    this.initLineChartsIns()
    this.updateSeries()
  },
  methods: {
    updateSeries() {
      this.loading = true
      this.getList()
      .then(list => {
        if (list && Array.isArray(list)) {
          if (this.myChartIns) {
            const option = this.myChartIns.getOption()
            option.series[0].data = list
            this.myChartIns.clear()
            this.myChartIns.setOption(option)
          }
        }
      })
      .finally(() => {
        this.loading = false
      })
    },
    getList() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const list = new Array(20).fill(1).map(_ => parseInt(Math.random() * 100))
          resolve(list)
        }, 500)
      })
    },
    initLineChartsIns() {
      // 基于准备好的dom，初始化echarts实例
      this.myChartIns = echarts.init(document.getElementById('line-charts'))
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: []
          }
        ]
      }
      this.myChartIns.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
#line-charts {
  min-height: 400px;
}
</style>
