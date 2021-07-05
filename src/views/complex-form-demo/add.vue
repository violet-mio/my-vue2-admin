<template>
  <ComplexFormDetail :is-edit="false" />
</template>

<script>
import ComplexFormDetail from './components/ComplexFormDetail'
export default {
  name: 'AddComplexForm',
  components: { ComplexFormDetail }
}
</script>
