<template>
  <div>
    <EditDetail :is-edit="false" />
  </div>
</template>
<script>
import EditDetail from './components/EditDetail'
export default {
  name: 'AddGoods',
  components: {
    EditDetail
  }
}
</script>