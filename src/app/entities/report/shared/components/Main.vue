<template>
  <container
    title="Отчеты"
  >
    <main-filter
      date-range-for-date-field
      action-text="Сформировать"
    />
    <ul class="reports__list pa-0 d-flex">
      <li class="reports__item d-flex">
        <div class="b-info">
          <p
            class="roboto-l-medium accent--text"
            style="margin-bottom: 10px"
          >
            Отчет 1
          </p>
          <p class="roboto-sm-regular hidden--text mb-0">
            01 января 2020 - 31 января 2020
          </p>
        </div>
        <base-btn
          min-width="151"
          max-width="151"
          height="44"
        >
          <v-icon
            style="margin-right: 5px"
            size="24"
            color="main--text"
          >
            $icons_download-square
          </v-icon>
          <p class="mb-0 roboto-s-regular main--text  ">
            экспорт в .XLS
          </p>
        </base-btn>
      </li>
    </ul>
  </container>
</template>

<script>
  import MainFilter from '@/app/shared/components/general/MainFilter'
  import Container from '@/app/shared/components/general/Container'

  export default {
    components: { Container, MainFilter },
    data () {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
.report-table {
  margin-top: calc(#{$block-indent-1} + 15px);
}
.field-filter {
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.reports__list {
  margin-left: 24px;
  margin-top: $block-indent-2;
  .reports__item {
    .b-info {
      margin-right: $block-indent-2;
    }
  }
}
</style>
