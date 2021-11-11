<template>
  <container
    title="Дэшборд"
  >
    <tab-list />
  </container>
</template>

<script>
  import TabList from './TabList'
  // import TabMap from './TabMap'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: {
      Container,
      TabList,
      // TabMap,
    },
    data () {
      return {
        // tabItems: [{ id: 1, text: 'Списком' }, { id: 2, text: 'На карте' }],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
