<template>
  <div>
    <el-form ref="postForm" :model="postForm" label-width="120px">
      <el-form-item label="name">
        <el-input v-model="postForm.name"></el-input>
      </el-form-item>

      <el-form-item label="area">
        <el-select v-model="postForm.area" placeholder="placeholder" @visible-change="handleSelectVisibleChange">
          <el-option 
            v-for="item in areaOptions" 
            :key="item.id" 
            :label="item.name" 
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="second_area">
        <el-select v-model="postForm.second_area" placeholder="placeholder" @visible-change="handleSelectVisibleChange">
          <el-option 
            v-for="item in secondOptions" 
            :key="item.id" 
            :label="item.name" 
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="service">
        <el-select v-model="postForm.service" placeholder="placeholder" @visible-change="handleSelectVisibleChange">
          <el-option 
            v-for="item in serviceOptions" 
            :key="item.id" 
            :label="item.name" 
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="handleSumbit">提 交</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { createPosition, updatePosition, getPositionDetail, getAreaOptions, getSecondAreaOptions, getServiceOptions } from '@/api/multi-select';
import { isEmpty } from '@/utils';
  const postForm = {
    name: '',
    area: '',
    second_area: '',
    service: ''
  }
  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        postForm: Object.assign({}, postForm),
        areaOptions: [],
        secondOptions: [],
        serviceOptions: [],
        isSelectVisible: false // 是否是下拉框出现触发
      }
    },
    watch: {
      'postForm.area'(newVal, oldVal) {
        if(this.isSelectVisible) {
          this.postForm.second_area = ''
        }
        if(!isEmpty(newVal)) {
          this.getSecondAreaOptions(newVal)
        }
      },
      'postForm.second_area'(newVal, oldVal) {
        if(this.isSelectVisible) {
          this.postForm.service = ''
        }
        if(!isEmpty(newVal)) {
          this.getServiceOptions(newVal)
        }
      }
    },
    created() {
      this.getAreaOptions()
      if (this.isEdit) {
        const id = this.$route.query.id
        this.postForm.id = id
        this.getDetail(this.postForm.id)
      }
    },
    methods: {
      getAreaOptions() {
        getAreaOptions()
        .then(res => {
          this.areaOptions = res.data.list
        })
      },
      getServiceOptions(id) {
        getServiceOptions(id)
        .then(res => {
          this.serviceOptions = res.data.list
        })
      },
      getSecondAreaOptions(id) {
        getSecondAreaOptions(id)
        .then(res => {
          this.secondOptions = res.data.list
        })
      },
      handleSumbit() {
        this.$refs.postForm.validate()
        .then(() => {
          const requestApi = this.isEdit ? updatePosition : createPosition
          const postFormCopy = Object.assign({}, this.postForm)
          requestApi(postFormCopy)
            .then(res => {
              this.$message.success(`${this.isEdit ? '编辑成功' : '新增成功'}`)
              this.$router.push({ name: 'MultiSelectList', query: { flush: true }})
            })
        })
        .catch(err => {
          console.log(err)
        })
      },
      handleCancel() {
        this.$router.back()
      },
      getDetail(id) {
        return new Promise((resolve, reject) => {
          getPositionDetail(id)
          .then(res => {
            this.postForm = res.data
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      handleSelectVisibleChange(v) {
        this.isSelectVisible = v
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>