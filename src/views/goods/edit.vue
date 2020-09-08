<template>
  <div>
    <EditGoodsDetail :is-edit="true" />
  </div>
</template>
<script>
import EditGoodsDetail from './components/EditGoodsDetail'
export default {
  name: 'EditGoods',
  components: {
    EditGoodsDetail
  }
}
</script>
