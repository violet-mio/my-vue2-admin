<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen':'full-screen'" @click="handleClick" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change)
      // 卸载之前移除监听事件
      this.$on('hook:destroyed', () => {
        screenfull.off('change', this.change)
      })
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    handleClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '很抱歉，您的浏览器不支持全屏功能',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
