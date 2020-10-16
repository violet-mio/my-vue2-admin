<template>
  <div>
    <MultiSelectDetail :is-edit="false" />
  </div>
</template>

<script>
import MultiSelectDetail from './components/MultiSelectDetail';
  export default {
    name: 'AddMultiSelectDetail',
    components: {
      MultiSelectDetail
    }
  }
</script>
