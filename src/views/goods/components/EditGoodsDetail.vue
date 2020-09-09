<template>
  <div class="app-container">
    <el-form ref="postFormRef" :model="postForm" :rules="postFormRules" label-width="120px" label-suffix="：">
      <edit-goods-info-detail ref="infoFormRef" v-model="postForm" :is-edit="isEdit" />
      <edit-goods-brand-detail ref="brandFormRef" v-model="postForm" :is-edit="isEdit" />
      <edit-goods-fav-detail ref="favFormRef" v-model="postForm" :is-edit="isEdit" />

      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="handleSumbit">提 交</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createGoods, updateGoods, getGoodsDetail } from '@/api/goods'
import { isEmpty } from '@/utils'
import EditGoodsInfoDetail from './EditGoodsInfoDetail'
import EditGoodsBrandDetail from './EditGoodsBrandDetail'
import EditGoodsFavDetail from './EditGoodsFavDetail'
const _cloneDeep = require('lodash/cloneDeep')

const defaultPostForm = {
  name: '',
  price: '',
  brand_id: '',
  keywords: '',
  product: '',
  desc: '',
  favorite: ''
}

export default {
  name: 'EditGoodsDetail',
  components: {
    EditGoodsInfoDetail,
    EditGoodsBrandDetail,
    EditGoodsFavDetail
  },
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
      this.$refs.postFormRef.validate()
        .then(() => {
        // 主表单验证成功，验证第一个子表单
          return this.$refs.infoFormRef.validate()
        })
        .then(() => {
          return this.$refs.brandFormRef.validate()
        })
        .then(() => {
          return this.$refs.favFormRef.validate()
        })
        .then(() => {
        // 全部验证通过
          const requestApi = this.isEdit ? updateGoods : createGoods
          const postFormCopy = _cloneDeep(this.postForm)

          // TODO删除
          // console.log(postFormCopy)
          // this.hideLoading()
          // return false

          requestApi(postFormCopy)
            .then(res => {
              this.$message.success(`${this.isEdit ? '编辑成功' : '新增成功'}`)
              this.$router.push({ name: 'GoodsList', query: { flush: true }})
            })
            .finally(() => {
              this.hideLoading()
            })
        })
        .catch(err => {
          console.log(err)
          this.hideLoading()
          return false
        })
    },
    handleCancel() {
      this.$router.back()
    },
    getDetail(id) {
      return new Promise((resolve, reject) => {
        getGoodsDetail(id).then(res => {
          const data = res.data
          this.postForm = data
          // this.postForm = Object.assign(this.postForm, data)
          resolve(data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>
