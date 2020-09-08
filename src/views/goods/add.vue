<template>
  <div>
    <EditGoodsDetail :is-edit="false" />
  </div>
</template>
<script>
import EditGoodsDetail from './components/EditGoodsDetail'
export default {
  name: 'AddGoods',
  components: {
    EditGoodsDetail
  }
}
</script>
