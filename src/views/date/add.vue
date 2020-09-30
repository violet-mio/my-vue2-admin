<template>
  <div>
    <DateDetail :is-edit="false" />
  </div>
</template>

<script>
  import DateDetail from './components/DateDetail';
  export default {
    name: 'AddDate',
    components: {
      DateDetail
    }
  }
</script>

<style lang="scss" scoped>

</style>