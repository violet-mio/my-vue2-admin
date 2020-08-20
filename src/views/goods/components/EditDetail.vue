<template>
  <div class="app-container">
    <el-form ref="postFormRef" :model="postForm" :rules="postFormRules" label-width="120px" label-suffix="：">
      <el-form-item label="名称" prop="name">
        <el-input v-model="postForm.name" placeholder="请输入名称" class="w500" clearable />
      </el-form-item>

      <el-form-item label="人群限定" prop="gender">
        <el-radio-group v-model="selectedSexLimit">
          <el-radio 
            v-for="item in genderLimitStatusOptions" 
            :key="item.id" 
            :label="item.id">{{ item.name }}
          </el-radio>
        </el-radio-group>

        <el-form-item v-show="selectedSexLimit === genderLimitStatus.LIMIT" label-width="96px" prop="checkedSexs">
          <el-select v-model="checkedSexs" multiple placeholder="请选择/可多选" >
            <el-option
              v-for="item in sexStatusOptions"
              :key="item.id + item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="handleSumbit">提 交</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { genderLimitStatus, genderLimitStatusOptions, sexStatusOptions } from '../options'
import { createGoods, updateGoods, getGoodsDetail } from '@/api/goods'
import { isEmpty } from '@/utils'

const _cloneDeep = (target) => {
  return JSON.parse(JSON.stringify(target))
}

const defaultPostForm = {
  name: '',
  price: '',
  gender: ''
}

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkGenderLimit = (rule, value, callback) => {
      value = this.selectedSexLimit
      if (value === '') {
        callback(new Error('请选择人群限制'));
      } else {
        callback()
      }
    };
    const checkSex = (rule, value, callback) => {
      if(this.selectedSexLimit === genderLimitStatus.LIMIT) {
        if(this.checkedSexs && this.checkedSexs.length <= 0) {
          callback(new Error('请选择人群'));
        } else {
          callback()
        }
      } else {
        callback()
      }
    };
    return {
      postForm: _cloneDeep(defaultPostForm),
      genderLimitStatus,
      genderLimitStatusOptions,
      selectedSexLimit: genderLimitStatus.UNLIMIT,
      checkedSexs: [],
      sexStatusOptions,
      postFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        gender: [
          { validator: checkGenderLimit, trigger: 'change' }
        ],
        checkedSexs: [
          { validator: checkSex, trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query.id
      this.postForm.id = id
      this.getDetail(this.postForm.id)
    }
  },
  methods: {
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    },
    handleSumbit() {
      this.showLoading()
      this.$refs.postFormRef.validate(async valid => {
        if (!valid) {
          this.hideLoading()
          return
        }
        const requestApi = this.isEdit ? updateGoods : createGoods
        const postFormCopy = _cloneDeep(this.postForm)
        postFormCopy.gender = this.getSexLimitVal()
        // TODO删除
        console.log(postFormCopy)
        // this.hideLoading()
        // return false

        const res = await requestApi(postFormCopy)
          .catch(() => {
            this.$message.error('提交失败')
          })
          .finally(() => {
            this.hideLoading()
          })

        if (res.code !== 20000) {
          return this.$message.error(`${this.isEdit ? '编辑失败' : '新增失败'}`)
        }
        this.$message.success(`${this.isEdit ? '编辑成功' : '新增成功'}`)
        this.$router.push({ name: 'GoodsList', query: { flush: true }})
      })
    },
    handleCancel() {
      this.$router.back()
    },
    // 获取人群限定
    getSexLimitVal() {
      const limit = this.selectedSexLimit
      if(limit === genderLimitStatus.UNLIMIT) {
        return JSON.stringify([])
      } else {
        const mapper = {
          [genderLimitStatus.LIMIT]: JSON.stringify([...this.checkedSexs])
        }
        return mapper[limit]
      }
    },
    setSexLimitVal(v) {
      if(isEmpty(v)) {
        return
      }
      const parseResult = JSON.parse(v)
      if(parseResult && parseResult.length > 0) {
        this.selectedSexLimit = genderLimitStatus.LIMIT
        this.checkedSexs = [...parseResult]
      } else {
        this.selectedSexLimit = genderLimitStatus.UNLIMIT
      }
    },
    getDetail(id) {
      return new Promise((resolve, reject) => {
        getGoodsDetail(id).then(res => {
          if (res.code === 20000) {
            const data = res.data
            this.setSexLimitVal(data.gender)
            this.postForm = Object.assign(this.postForm, data)
            resolve(data)
          } else {
            this.$message.error(res.data.message)
            reject()
          }
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
  },
}
</script>
