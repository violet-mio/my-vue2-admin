<template>
  <div class="app-container">
    <el-form ref="postFormRef" :model="postForm" :rules="postFormRules" label-width="120px" label-suffix="：">
      <el-card>
        <div slot="header">基本信息</div>
        <el-form-item label="素材名称" prop="name">
          <el-input v-model="postForm.name" placeholder="请输入素材名称" class="w500" clearable />
        </el-form-item>
        <el-form-item label="广告类型" prop="type_id">
          <el-select v-model="postForm.type_id" placeholder="请选择广告类型" @change="handleTypeChange">
            <el-option
              v-for="typeItem in typeOptions"
              :key="typeItem.type_id"
              :label="typeItem.type_name"
              :value="typeItem.type_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="广告规格" prop="spec_id">
          <el-select v-model="postForm.spec_id" placeholder="请选择广告规格">
            <el-option
              v-for="specItem in specOptions"
              :key="specItem.spec_id"
              :label="specItem.spec_name"
              :value="specItem.spec_id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" @click="handleSumbit">提 交</el-button>
          <el-button @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-card>

    </el-form>
  </div>
</template>

<script>
const _cloneDeep = require('lodash/cloneDeep')
import { createComplexForm, updateCompleForm, getComplexForm, getAdTypes, getAdSpecs } from '@/api/complex-form-demo'
const defaultPostForm = {
  name: '',
  type_id: '',
  spec_id: ''
}

export default {
  name: 'ComplexFormDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: _cloneDeep(defaultPostForm),
      postFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type_id: [{ required: true, message: '请选择广告类型', trigger: 'change' }],
        spec_id: [{ required: true, message: '请选择广告规格', trigger: 'change' }]
      },
      loading: false,
      typeOptions: [],
      specOptions: []
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query.id
      this.postForm.id = id
    }
    Promise.all([
      this.getAdTypeOptions()
      // 请求一些options选项
    ]).finally(() => {
      if (this.isEdit) {
        this.getDetail(this.postForm.id).then(() => {
          // 请求详情后请求子类options选项
          const { type_id } = this.postForm
          this.getAdSpecOptions({ type_id })
        })
      }
    })
  },
  methods: {
    getDetail(id) {
      return new Promise((resolve, reject) => {
        getComplexForm({ id })
          .then(res => {
            this.postForm = _cloneDeep(Object.assign(this.postForm, res.data))
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    handleCancel() {
      this.$router.back()
    },
    handleSumbit() {
      this.$refs.postFormRef.validate()
        .then(() => {
          // 全部验证通过
          const postFormCopy = _cloneDeep(this.postForm)
          const requestApi = this.isEdit ? updateCompleForm : createComplexForm
          // 获取当前表单类型的提交函数，并提交
          this.showLoading()
          requestApi(postFormCopy)
            .then(res => {
              this.$message.success(`${this.isEdit ? '编辑成功' : '新增成功'}`)
              this.$store.dispatch('tagsView/delCurrentView', {
                view: this.$route,
                $router: this.$router
              })
            })
            .finally(() => {
              this.hideLoading()
            })
        })
        .catch(err => {
          console.log(err)
          return
        })
    },
    getAdTypeOptions() {
      getAdTypes()
        .then(res => {
          this.typeOptions = res.data.list
        })
    },
    getAdSpecOptions(params) {
      getAdSpecs(params)
        .then(res => {
          this.specOptions = res.data.list
        })
    },
    handleTypeChange() {
      this.postForm.spec_id = ''
      this.getAdSpecOptions({ type_id: this.postForm.type_id })
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/styles/width.scss';
</style>
