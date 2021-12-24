<template>
  <container
    title="Зоны загрузки"
    search
    search-label="Зоны загрузки"
    :search-value.sync="search"
  >
    <v-responsive
      max-width="1390"
      class="table-field--positioning"
    >
      <v-form ref="form">
        <ul class="header__list pa-0">
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Название
            </p>
            <base-text-field
              v-model="form.name"
              :rules="rules.name"
              class="item-field details--absolute"
              label="Название зоны загрузки"
              style="max-width: 250px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              id SAP
            </p>
            <base-text-field
              v-model="form.id_sap"
              :rules="rules.id_sap"
              class="item-field details--absolute"
              label="id SAP"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              id 1C
            </p>
            <base-text-field
              v-model="form.id_1c"
              :rules="rules.id_1c"
              class="item-field details--absolute"
              label="id 1C"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Долгота центра
            </p>
            <base-text-field
              v-model="form.lng"
              :rules="rules.lng"
              class="item-field details--absolute"
              label="Долгота"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Широта центра
            </p>
            <base-text-field
              v-model="form.lat"
              :rules="rules.lat"
              class="item-field details--absolute"
              label="Широта"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <p class="item-title roboto-s-regular accent--text">
              Радиус зоны
            </p>
            <base-text-field
              v-model="form.radius"
              :rules="rules.radius"
              class="item-field details--absolute"
              label="Радиус"
              style="max-width: 150px"
            />
          </li>
          <li class="header__item">
            <base-btn
              class="btn-create"
              min-width="250"
              width="250"
              :loading="$wait.is('[loading-area] create')"
              @click="onCreate"
            >
              Создать
            </base-btn>
          </li>
        </ul>
      </v-form>
      <table-fields
        :headers="tableHeaders"
        :items.sync="tableItems"
        :options.sync="tableOptions"
        :server-items-length="loadingareaTotal"
        :loading="$wait.is('[loading-area] loading table')"
      >
        <template v-slot:[`item.action`]="{ item }">
          <div
            class="d-flex"
          >
            <base-btn
              min-width="140"
              width="140"
              class="btn-save"
              hide-details
              :disabled="!changedList[item.id]"
              :loading="$wait.is(`[loading-area] save ${item.id}`)"
              @click="onSave(item)"
            >
              Сохранить
            </base-btn>
            <base-btn
              min-width="90"
              width="90"
              color="hidden"
              :loading="$wait.is(`[loading-area] delete ${item.id}`)"
              @click="onDelete(item.id)"
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
  import { actionsTypes, gettersTypes } from '@/app/entities/loading-area/shared/state/loading-area'
  import { mapActions, mapGetters } from 'vuex'
  import Container from '@/app/shared/components/general/Container'
  import TableFields from '@/app/shared/components/general/TableFields'
  const { required, minLength, maxLength, numeric, decimal } = require('vuelidate/lib/validators')

  export default {
    components: { Container, TableFields },
    data () {
      return {
        search: '',
        form: {},
        rules: {
          name: [
            v => required(v) || this.$t('validation.required'),
            v => minLength(2)(v) || this.$t('validation.minLength', { count: 2 }),
            v => maxLength(255)(v) || this.$t('validation.maxLength', { count: 255 }),
          ],
          id_sap: [
            v => required(v) || this.$t('validation.required'),
            v => maxLength(255)(v) || this.$t('validation.maxLength', { count: 255 }),
          ],
          id_1c: [
            v => required(v) || this.$t('validation.required'),
            v => maxLength(255)(v) || this.$t('validation.maxLength', { count: 255 }),
          ],
          lng: [
            v => required(v) || this.$t('validation.required'),
            v => decimal(v) || this.$t('validation.decimal'),
          ],
          lat: [
            v => required(v) || this.$t('validation.required'),
            v => decimal(v) || this.$t('validation.decimal'),
          ],
          radius: [
            v => numeric(v) || this.$t('validation.numeric'),
            v => maxLength(50)(v) || this.$t('validation.maxLength', { count: 50 }),
          ],
        },
        tableOptions: {
          page: 1,
          itemsPerPage: 10,
          sortBy: 'id',
        },
        tableHeaders: [
          { text: 'Название зоны загрузки', value: 'name', maxWidth: 250 },
          { text: 'id SAP', value: 'id_sap', maxWidth: 150, readonly: true },
          { text: 'id 1C', value: 'id_1c', maxWidth: 150, readonly: true },
          { text: 'Долгота', value: 'lng', maxWidth: 150 },
          { text: 'Широта', value: 'lat', maxWidth: 150 },
          { text: 'Радиус', value: 'radius', maxWidth: 150 },
          { text: '', value: 'action' },
        ],
        tableItems: [],
        changedList: {},
      }
    },
    computed: {
      ...mapGetters({
        loadingarea: 'loading-area/loadingArea/' + gettersTypes.LOADINGAREA,
        loadingareaTotal: 'loading-area/loadingArea/' + gettersTypes.LOADINGAREA_TOTAL,
      }),
      pagOffset () {
        return (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage
      },
    },
    watch: {
      loadingarea: {
        deep: true,
        handler (v) {
          this.tableItems = JSON.parse(JSON.stringify(v))
        },
      },
      'tableOptions.page' (v) {
        if (v) this.fetchData()
      },
      'tableOptions.itemsPerPage' (v) {
        if (v) this.fetchData()
      },
      search () {
        this.$_.debounce(() => {
          this.fetchData()
        }, 300)()
      },
      tableItems: {
        deep: true,
        handler (v) {
          v.forEach(el => {
            const loadingarea = this.$_.findWhere(this.loadingarea, { id: el.id })

            loadingarea.radius = String(loadingarea.radius)

            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(loadingarea)) {
              if (value === null) {
                loadingarea[key] = ''
              }
            }
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(el)) {
              if (value === null) {
                el[key] = ''
              }
            }

            this.changedList[el.id] =
              JSON.stringify(el) !== JSON.stringify(loadingarea)
          })
        },
      },
    },
    async mounted () {
      await this.fetchData()
    },
    methods: {
      ...mapActions({
        fetchList: 'loading-area/loadingArea/' + actionsTypes.LIST,
        fetchCreate: 'loading-area/loadingArea/' + actionsTypes.CREATE,
        fetchUpdate: 'loading-area/loadingArea/' + actionsTypes.UPDATE,
        fetchDelete: 'loading-area/loadingArea/' + actionsTypes.DELETE,
      }),
      async fetchData () {
        this.$wait.start('[loading-area] loading table')
        const payload = {
          offset: this.pagOffset,
          sortBy: this.tableOptions.sortBy,
          sortByDesk: true,
          limit: this.tableOptions.itemsPerPage,
        }

        if (this.search) {
          payload.search = this.search.trim()
        }

        await this.fetchList(payload)
        this.$wait.end('[loading-area] loading table')
      },
      async onCreate () {
        if (this.$refs.form.validate()) {
          try {
            this.$wait.start('[loading-area] create')
            await this.fetchCreate(this.form)
          } finally {
            this.$wait.end('[loading-area] create')
          }
          this.$refs.form.reset()
          await this.fetchData()
        }
      },
      async onSave (item) {
        try {
          this.$wait.start(`[loading-area] save ${item.id}`)
          await this.fetchUpdate(item)
        } finally {
          this.$wait.end(`[loading-area] save ${item.id}`)
        }
      },
      async onDelete (id) {
        try {
          this.$wait.start(`[loading-area] delete ${id}`)
          await this.fetchDelete(id)
          await this.fetchData()
        } finally {
          this.$wait.end(`[loading-area] delete ${id}`)
        }
      },
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
  width: 100%;
  .header__item {
    display: table-cell;
    vertical-align: bottom;
    &:not(:first-child) {
      padding-left: 20px !important;
    }
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
  }
}
</style>
