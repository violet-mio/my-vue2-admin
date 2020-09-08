<template>
  <div class="app-container">
    <el-form ref="goodsInfoFormRef" :model="value" :rules="goodsInfoFormRules" label-width="120px" label-suffix="：">
      <el-form-item label="名称" prop="name">
        <el-input v-model="value.name" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="value.price" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const _cloneDeep = require('lodash/cloneDeep')
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
      goodsInfoFormRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 返回`elementUI`表单验证的结果（为`promise`对象）
    validate() {
      return this.$refs.goodsInfoFormRef.validate()
    }
  }
}
</script>
