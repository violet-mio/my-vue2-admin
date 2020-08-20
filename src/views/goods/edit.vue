<template>
  <div>
    <EditDetail :is-edit="true" />
  </div>
</template>
<script>
import EditDetail from './components/EditDetail'
export default {
  name: 'EditGoods',
  components: {
    EditDetail
  }
}
</script>