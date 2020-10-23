<template>
  <VueDPlayer ref="player" :options="videoOptions" class="vue-dplayer" />
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    props: {
      src: {
        type: String,
        default: ''
      }
    },
    components: {
      VueDPlayer
    },
    data() {
      return {
        player: null
      }
    },
    computed: {
      videoOptions() {
        const options = {
          video: {
            url: this.src,
            pic: ''
          }
        }
        return options
      }
    },
    mounted () {
      this.player = this.$refs.player.dp
    },
    beforeDestroy() {
      if(this.player) {
        this.player.destroy()
        this.player = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-dplayer {
    width: 592px;
    height: 333px;
  }
</style>