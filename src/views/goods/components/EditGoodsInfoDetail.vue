<template>
  <div class="app-container">
    <el-form ref="goodsInfoFormRef" :model="value" :rules="goodsInfoFormRules" label-width="120px" label-suffix="：">
      <el-form-item label="名称" prop="name">
        <el-input v-model="value.name" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="value.price" />
      </el-form-item>
      <el-form-item label="大小">
        <el-select v-model="value.size" placeholder="请输入大小">
          <el-option
            v-for="item in sizeStatusOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人群限定">
        <el-radio-group v-model="selectedSexLimit" @change="handleSexLimitChange">
          <el-radio 
            v-for="item in sexLimitStatusOptions" 
            :key="item.id"
            :label="item.id">
            {{ item.name }}
          </el-radio>
        </el-radio-group>

        <el-form-item v-show="selectedSexLimit === sexLimitStatus.LIMIT" prop="gender" label-width="96px">
            <el-select v-model="value.gender" multiple placeholder="请选择性别/可多选" >
              <el-option
                v-for="sexItem in sexStatusOptions"
                :key="sexItem.id"
                :label="sexItem.name"
                :value="sexItem.id">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { isEmpty, isJSON } from '@/utils'
const _cloneDeep = require('lodash/cloneDeep')
import { sizeStatusOptions, sexLimitStatusOptions, sexLimitStatus, sexStatusOptions } from '../options'

export default {
  name: 'EditGoodsInfoDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasInit: false,
      selectedSexLimit: null,
      sexLimitStatus,
      sexStatusOptions,
      sizeStatusOptions,
      sexLimitStatusOptions,
      goodsInfoFormRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initEdit() {
      const detail = this.value
      detail.price = detail.price / 100
      if(detail.gender) {
        this.setGender(detail.gender)
        this.value.gender = JSON.parse(detail.gender)
      }
    },
    getData(postFormCopy) {
      postFormCopy.price = postFormCopy.price * 100
      postFormCopy.gender = JSON.stringify(postFormCopy.gender)
      return postFormCopy
    },
    // 返回`elementUI`表单验证的结果（为`promise`对象）
    validate() {
      return this.$refs.goodsInfoFormRef.validate()
    },
    handleSexLimitChange(v) {
      if(v === sexLimitStatus.LIMIT) {
        this.value.gender = []
      }
    },
    setGender(v) {
      let parseRs = JSON.parse(v)
      if(Array.isArray(parseRs)) {
        if(parseRs.length === 0) {
          this.selectedSexLimit = sexLimitStatus.UNLIMI
          return
        }
        if(parseRs.length > 0) {
          this.selectedSexLimit = sexLimitStatus.LIMIT
          return
        }
      }
      this.selectedSexLimit = ''
      return
    }
  }
}
</script>
