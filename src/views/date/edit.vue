<template>
  <div>
    <DateDetail :is-edit="true" />
  </div>
</template>

<script>
  import DateDetail from './components/DateDetail'
  export default {
    name: 'EditDate',
    components: {
      DateDetail
    }
  }
</script>

<style lang="scss" scoped>

</style>