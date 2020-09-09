<template>
  <div class="app-container">
    <el-form ref="goodsFavFormRef" :model="value" :rules="goodsFavFormRules" label-width="120px" label-suffix="：">
      <el-form-item label="产品" prop="product">
        <el-select v-model="value.product" placeholder="请输入产品">
          <el-option
            v-for="item in productOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="value.desc" />
      </el-form-item>
      <el-form-item label="关键词" prop="favorite">
        <el-input v-model="value.favorite" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const _cloneDeep = require('lodash/cloneDeep')
import { getProductOptions } from '@/api/goods'
import { isEmpty } from '@/utils'

export default {
  name: 'EditGoodsFavDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFirst: true,
      productOptions: [],
      goodsFavFormRules: {
        product: [
          { required: true, message: '请输入产品', trigger: 'blur' },
        ],
        // desc: [
        //   { required: true, message: '请输入描述', trigger: 'blur' },
        //   { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        // ],
        // favorite: [
        //   { required: true, message: '请输入喜好', trigger: 'blur' },
        //   { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    brandId() {
      return this.value.brand_id
    }
  },
  watch: {
    brandId: {
      handler: function(newVal, oldVal) {
        const isEmptyToVal = !isEmpty(newVal) && isEmpty(oldVal)
        // 排除编辑状态下，首次服务端赋值时，不进行置空
        if(!(this.isEdit && isEmptyToVal)) {
          this.value.product = ''
        }
        if(isEmpty(newVal)) return
        // console.log(isEmptyToVal)
        this.getProductOptions(newVal)
      },
      immediate: true
    }
  },
  methods: {
    // 返回`elementUI`表单验证的结果（为`promise`对象）
    validate() {
      return this.$refs.goodsFavFormRef.validate()
    },
    getProductOptions(id) {
      return new Promise((resolve, reject) => {
        getProductOptions(id).then(res => {
          this.productOptions = res.data.list
          resolve(res.data.list)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>
