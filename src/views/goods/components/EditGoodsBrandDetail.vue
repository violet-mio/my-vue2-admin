<template>
  <div class="app-container">
    <el-form ref="goodsBrandFormRef" :model="value" :rules="goodsBrandFormRules" label-width="120px" label-suffix="：">
      <el-form-item label="品牌名称" prop="brand_id">
        <el-select v-model="value.brand_id" placeholder="请输入品牌名称">
          <el-option
            v-for="item in brandOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <!-- <el-input v-model="value.brand_id" /> -->
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="value.keywords" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const _cloneDeep = require('lodash/cloneDeep')
import { getBrandOptions } from '@/api/goods'
import { isEmpty } from '@/utils'
export default {
  name: 'EditGoodsBrandDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brandOptions: [],
      goodsBrandFormRules: {
        brand_id: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        // keywords: [
        //   { required: true, message: '请输入关键词', trigger: 'blur' },
        //   { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    size() {
      return this.value.size
    }
  },
  watch: {
    size: {
      handler: function(newVal, oldVal) {
      if(!(this.isEdit && isEmpty(oldVal) && !isEmpty(newVal))) {
        this.value.brand_id = ''
      }
      this.getBrandOptions()
      },
      immediate: true
    }
  },
  created() {
    // this.getBrandOptions()
  },
  methods: {
    // 返回`elementUI`表单验证的结果（为`promise`对象）
    validate() {
      return this.$refs.goodsBrandFormRef.validate()
    },
    getBrandOptions() {
      getBrandOptions().then(res => {
        this.brandOptions = res.data.list
      })
    }
  }
}
</script>
