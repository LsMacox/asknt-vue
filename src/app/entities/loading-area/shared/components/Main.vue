<template>
  <container
    title="Зоны загрузки"
    search
    search-label="Зоны загрузки"
    :search-value.sync="search"
  >
    <v-responsive
      max-width="1390"
      class="outlet-responsive"
      style="position: absolute;right: 8vw;"
    >
      <ul class="header__list pa-0">
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            Название
          </p>
          <base-text-field
            class="item-field"
            label="Название зоны загрузки"
            style="max-width: 250px"
            hide-details
          />
        </li>
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            id SAP
          </p>
          <base-text-field
            class="item-field"
            label="id SAP"
            style="max-width: 150px"
            hide-details
          />
        </li>
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            id 1C
          </p>
          <base-text-field
            class="item-field"
            label="id 1C"
            style="max-width: 150px"
            hide-details
          />
        </li>
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            Долгота центра
          </p>
          <base-text-field
            class="item-field"
            label="Долгота"
            style="max-width: 150px"
            hide-details
          />
        </li>
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            Широта центра
          </p>
          <base-text-field
            class="item-field"
            label="Широта"
            style="max-width: 150px"
            hide-details
          />
        </li>
        <li class="header__item">
          <p class="item-title roboto-s-regular accent--text">
            Радиус зоны
          </p>
          <base-text-field
            class="item-field"
            label="Радиус"
            style="max-width: 150px"
            hide-details
          />
        </li>
        <li class="header__item">
          <base-btn
            class="btn-create"
            min-width="250"
            width="250"
          >
            Создать
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
              min-width="140"
              width="140"
              class="btn-save"
              hide-details
            >
              Сохранить
            </base-btn>
            <base-btn
              min-width="90"
              width="90"
              color="hidden"
            >
              <v-icon
                class="mr-0"
                size="24"
                color="main"
              >
                $icons_trash
              </v-icon>
            </base-btn>
          </div>
        </template>
      </table-fields>
    </v-responsive>
  </container>
</template>

<script>
  import Container from '@/app/shared/components/general/Container'
  import TableFields from '@/app/shared/components/general/TableFields'

  export default {
    components: { Container, TableFields },
    data () {
      return {
        search: '',
        tableHeaders: [
          { text: 'Название ТТ', value: 'name', maxWidth: 250, sortable: false },
          { text: 'Код ТТ', value: 'code', maxWidth: 150, sortable: false },
          { text: 'Адрес ТТ', value: 'addres', maxWidth: 150, sortable: false },
          { text: 'Долгота', value: 'lng', maxWidth: 150, sortable: false },
          { text: 'Широта', value: 'lat', maxWidth: 150, sortable: false },
          { text: 'Радиус', value: 'radius', maxWidth: 150, sortable: false },
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
  display: table;
  list-style: none;
  margin-bottom: 40px;
  .header__item {
    display: table-cell;
    vertical-align: bottom;
    &:not(:first-child) {
      padding-left: 20px !important;
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