<template>
  <div>
    <MultiSelectDetail :is-edit="true" />
  </div>
</template>

<script>
import MultiSelectDetail from './components/MultiSelectDetail';
  export default {
    name: 'EditMultiSelectDetail',
    components: {
      MultiSelectDetail
    }
  }
</script>
