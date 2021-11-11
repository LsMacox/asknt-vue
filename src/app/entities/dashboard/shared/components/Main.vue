<template>
  <container
    title="Дэшборд"
    tabs
    :tab-items="tabItems"
  >
    <template v-slot:[`tab-1`]>
      <tab-list />
    </template>
    <template v-slot:[`tab-2`]>
      <tab-map />
    </template>
  </container>
</template>

<script>
  import TabList from './TabList'
  import TabMap from './TabMap'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: { Container, TabMap, TabList },
    data () {
      return {
        tabItems: [{ id: 1, text: 'Списком' }, { id: 2, text: 'На карте' }],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
