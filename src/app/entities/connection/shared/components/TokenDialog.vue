<template>
  <v-dialog
    content-class="dialog-token"
    :value="dialog"
    width="530"
    @input="$emit('change', $event)"
  >
    <v-card>
      <v-card-title class="card-title d-flex justify-space-between roboto-xl-medium black--text">
        Авторизация в Wialon
        <v-img
          :src="require('@/assets/icons/wialon-full.png')"
          max-width="64"
          max-height="17"
        />
      </v-card-title>

      <v-card-text class="card-text roboto-extra-sm-regular grey--text">
        Сервису необходим доступ к Вашей системе мониторинга, чтобы обмениваться с ней данными. Предоставьте сервису доступ к Вашему Wialon, чтобы он смог корректно работать.
      </v-card-text>

      <v-form v-model="validToken">
        <v-text-field
          class="field-token"
          label="Токкен для доступа к Wialon"
          :rules="tokeRules"
          autocomplete="off"
          outlined
          single-line
        />
      </v-form>

      <v-card-actions class="card-action">
        <v-btn
          class="btn-authorize"
          height="68"
          :disabled="!validToken"
          depressed
          color="secondary"
          min-width="250"
          @click="$emit('change', false)"
        >
          <p class="text-button text-capitalize mb-0">
            Авторизоваться
          </p>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const { required } = require('vuelidate/lib/validators')

  export default {
    model: {
      prop: 'dialog',
      event: 'change',
    },
    props: {
      dialog: Boolean,
    },
    data () {
      return {
        validToken: false,
        tokeRules: [
          v => required(v) || 'Просьба заполнить поле',
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
::v-deep {
  .dialog-token {
    .field-token {
      padding: 0 40px 0 40px;
      .v-input__slot {
        margin-bottom: 10px !important;
      }
    }
    .v-card {
      background-color: var(--v-primary-base) !important;
      border-radius: $block-border-radius;
      .v-card__title {
        line-height: 34px;
        padding: 40px 55px 0 55px;
      }
      .v-card__text {
        padding: 10px 40px 20px 55px;
      }
      .v-card__actions {
        padding: 66px 40px 40px 40px;
      }
    }
  }
}
.field-token {
  width: 100%;
  max-width: 100% !important;
}
.btn-authorize {
  width: 100%;
}

</style>
