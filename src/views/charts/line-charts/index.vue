<template>
  <div>
    <el-button type="primary" size="mini" @click="updateSeries">手动拉取新数据</el-button>
    <div v-loading="loading" id="line-charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
const _debounce = require('lodash/debounce')

export default {
  name: 'LineCharts',
  data() {
    return {
      chart: null,
      loading: false,
      debounceResizeHandler: null
    }
  },
  mounted() {
    this.initLineCharts()
    this.addResizeListener()
    this.updateSeries()
  },
  beforeDestroy() {
    this.removeResizeListener()
    this.destroyChart()
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
        // 模拟请求
        setTimeout(() => {
          const list = new Array(6).fill(1).map(_ => parseInt(Math.random() * 100))
          resolve(list)
        }, 300)
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
    },
    addResizeListener() {
      this.debounceResizeHandler = _debounce(() => {
        this.resize()
      }, 200)
      window.addEventListener('resize', this.debounceResizeHandler)
    },
    removeResizeListener() {
      if(this.debounceResizeHandler) {
        window.removeResizeListener('resize', this.debounceResizeHandler)
      }
    },
    // 屏幕尺寸变化时，重新设置大小
    resize() {
      this.chart && this.chart.resize()
    },
    // 销毁chart实例
    destroyChart() {
      if(this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#line-charts {
  min-height: 400px;
}
</style>
