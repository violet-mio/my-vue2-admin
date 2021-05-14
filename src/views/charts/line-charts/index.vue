<template>
  <div>
    <el-button type="primary" size="mini" @click="updateSeries">拉取新数据</el-button>
    <div v-loading="loading" id="line-charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineCharts',
  data() {
    return {
      chart: null,
      loading: false
    }
  },
  mounted() {
    this.initLineCharts()
    this.updateSeries()
  },
  beforeDestroy() {
    if(this.chart) {
      // 销毁实例
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    updateSeries() {
      this.loading = true
      this.getList()
      .then(list => {
        if (list && Array.isArray(list)) {
          if (this.chart) {
            const option = this.chart.getOption()
            // 使用服务器数据替换原来的数据
            option.series[0].data = list
            this.chart.clear()
            this.chart.setOption(option)
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
          const list = new Array(6).fill(1).map(_ => parseInt(Math.random() * 100))
          resolve(list)
        }, 500)
      })
    },
    initLineCharts() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('line-charts'))
      // 使用option进行第一次初始化
      const option = {
        title: {
          text: '标题'
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
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
#line-charts {
  min-height: 400px;
}
</style>
