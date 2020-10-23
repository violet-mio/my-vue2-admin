<template>
  <div>
    <el-upload
      ref="uploadRef"
      action="#"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="httpRequest">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <div v-if="videoSrc && videoSrc.length > 0" class="video-wrapper">
      <!-- <video :src="videoSrc" controls preload="none" style="max-width: 600px; max-height:500px;"></video> -->
      <VideoPlayer :src="videoSrc" />
      <el-button type="primary" @click="handleRemove">移除</el-button>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer'

  export default {
    data() {
      return {
        videoFormat: ["video/mp4"],
        maxSize: 20,
        videoSrc: ''
      }
    },
    components: {
      VideoPlayer
    },
    methods: {
      beforeUpload(file) {
        // const isAcceptFormat = this.videoFormat.includes(file.type)
        // // 验证格式
        // if (!isAcceptFormat) {
        //   this.$message.error(`上传视频只能是 ${this.videoFormat.join(',')} 格式!`, 3000)
        //   return false
        // }

        // // 验证大小
        // const isAcceptSize = file.size <= this.maxSize * 1024 * 1024
        // if (!isAcceptSize) {
        //   this.$message.error(`上传视频大小不能超过 ${this.maxSize}M!`)
        //   return false
        // }
      },
      httpRequest(params) {
         const file = params.file
        const _URL = window.URL || window.webkitURL
        const url = _URL.createObjectURL(file)
        this.videoSrc = url

      },
      handleRemove() {
        this.$refs.uploadRef.clearFiles()
        this.videoSrc = ''
      }
    },
  }
</script>

<style lang="scss" scoped>
  .video-wrapper {
    width: 800px;
  }
</style>