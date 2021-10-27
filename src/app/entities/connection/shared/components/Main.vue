<template>
  <container
    title="Подключение Wialon"
    search
    search-label="Перевозчик/Код перевозчика"
    :search-value.sync="search"
  >
    <ul class="header__list pa-0">
      <li class="header__item">
        <p class="item-title roboto-s-regular accent--text">
          Перевозчик
        </p>
        <base-text-field
          class="item-field"
          label="Название перевозчика"
          style="min-width: 250px"
          hide-details
        />
      </li>
      <li class="header__item">
        <p class="item-title roboto-s-regular accent--text">
          Код перевозчика
        </p>
        <base-text-field
          class="item-field"
          label="Код перевозчика"
          hide-details
        />
      </li>
      <li class="header__item">
        <p class="item-title roboto-s-regular accent--text">
          Host
        </p>
        <base-text-field
          class="item-field"
          label="Новый host"
          hide-details
        />
      </li>
      <li class="header__item">
        <base-btn
          class="btn-create"
          min-width="250"
          width="250"
          @click="tokeConfirmDialog = true"
        >
          Подключить
        </base-btn>
      </li>
    </ul>
    <table-fields
      :headers="tableHeaders"
      :items="tableItems"
    >
      <template v-slot:[`item.action`]>
        <div class="d-flex">
          <base-btn
            min-width="250"
            width="250"
            color="hidden"
          >
            <v-icon
              size="24"
              color="main"
              style="margin-right: 5px"
            >
              $icons_download-square
            </v-icon>
            <p class="roboto-s-regular main--text mb-0">
              Скачать список объектов
            </p>
          </base-btn>
        </div>
      </template>
    </table-fields>
    <token-dialog v-model="tokeConfirmDialog" />
  </container>
</template>

<script>
  import Container from '@/app/shared/components/general/Container'
  import TableFields from '@/app/shared/components/general/TableFields'
  import TokenDialog from './TokenDialog.vue'

  export default {
    components: { Container, TableFields, TokenDialog },
    data () {
      return {
        search: '',
        tokeConfirmDialog: false,
        tableHeaders: [
          { text: 'Название перевозчика', value: 'name', fieldWidth: 250, sortable: false },
          { text: 'Код перевозчика', value: 'code', fieldWidth: 180, sortable: false },
          { text: 'Новый host', value: 'host', fieldWidth: 250, sortable: false },
          { text: 'Токен', value: 'token', fieldWidth: 250, sortable: false },
          { text: '', value: 'action', sortable: false },
        ],
        tableItems: [
          {
            name: 'Пятерочка',
            code: '235648',
            addres: 'Россия, Москва продолжение...',
            lng: '55.821335',
            lat: '37.733841',
            radius: '100',
          },
          {
            name: 'Пятерочка',
            code: '235648',
            addres: 'Россия, Москва продолжение...',
            lng: '55.821335',
            lat: '37.733841',
            radius: '100',
          },
          {
            name: 'Пятерочка',
            code: '235648',
            addres: 'Россия, Москва продолжение...',
            lng: '55.821335',
            lat: '37.733841',
            radius: '100',
          },
          {
            name: 'Пятерочка',
            code: '235648',
            addres: 'Россия, Москва продолжение...',
            lng: '55.821335',
            lat: '37.733841',
            radius: '100',
          },
          {
            name: 'Пятерочка',
            code: '235648',
            addres: 'Россия, Москва продолжение...',
            lng: '55.821335',
            lat: '37.733841',
            radius: '100',
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
.btn-save {
  margin-right: 20px;
}
.header__list {
  display: flex;
  list-style: none;
  margin-bottom: 40px;
  .header__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &:not(:last-child) {
      margin-right: 20px;
    }
    .item-title {
      margin-bottom: 10px;
    }
    .item-field {
      width: 100%;
      & ::v-deep {
        .v-input__slot {
          background: var(--v-main-base);
        }
      }
    }
    .btn-create {
    }
  }
}
</style>
