<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="日期范围：" label-width="100px" prop="dateRange">
        <el-date-picker
          v-model="form.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :picker-options="dateRangePickerOptions"
          :default-time="['00:00:00', '23:59:59']"
        />
      </el-form-item>
      <el-form-item label="label">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { isEmpty } from '@/utils/index';
  const one_day_time = 86400000
  export default {
    data() {
      const validDate = (rule, value, callback) => {
        if (isEmpty(value)) {
          callback(new Error('请选择日期'))
        }
        if(value > Date.now() + 3 * one_day_time) {
          callback(new Error('开始日期过大'))
        }
        callback()
      }
      return {
        dateRangePickerOptions: {
          // 开始日期限定
          disabledDate: time => {
            // if(isEmpty(time)) {
            //   return false
            // }
            // console.log(time)
            // if (this.form.ended_at) {
            //   return time.getTime() < Date.now() - 24 * 60 * 60 * 1000 || time.getTime() > this.postForm.ended_at
            // } else {
              return time.getTime() < Date.now() - one_day_time || time.getTime() > Date.now() + 9 * one_day_time
            // }
          },
        },
        form: {
          dateRange: [],
          started_at: '',
          ended_at: ''
        },
        rules: {
          dateRange: [
            { 
              required: true, type: 'array', trigger: 'blur', message: '请选择时间',
              fields: {
                0 : { type: 'number', required: true, trigger: 'blur', validator: validDate },
                1 : { type: 'number', required: true, trigger: 'blur', message: '请选择结束时间'}
              }
            }
          ]
        }
      }
    },
    watch: {
      'form.dateRange'(newVal, oldVal) {
        console.log(newVal)
        if (!isEmpty(newVal)) {
          this.form.started_at = newVal[0] / 1000
          this.form.ended_at = newVal[1] / 1000
        } else {
          this.form.started_at = null
          this.form.ended_at = null
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form
        .validate()
        .then(() => {
          console.log(this.form);
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>