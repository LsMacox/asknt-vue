<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img
          class="mx-auto logo-img"
          max-width="499"
          max-height="111"
          :src="require('@/assets/img/header-logo.png')"
        />
      </v-col>
      <v-col
        class="block-login"
        cols="12"
      >
        <v-card
          class="mx-auto text-center"
          max-width="344"
          outlined
          min-width="570"
        >
          <v-card-text class="card-text">
            <p class="futura-pt-l-medium accent--text mb-0">
              Авторизация
            </p>
          </v-card-text>

          <v-form
            v-model="formValid"
            class="form d-flex flex-column align-center"
          >
            <base-text-field
              v-model="form.login"
              :rules="rules.login"
              class="field-login"
              placeholder=" "
              label="Логин / email"
              height="50"
            />
            <base-text-field
              v-model="form.password"
              :rules="rules.password"
              class="field-password mt-1"
              label="Пароль"
              type="password"
              placeholder=" "
              hide-details
              height="50"
            />
          </v-form>

          <v-card-actions class="card-action d-flex justify-center">
            <base-btn @click="onLogin">
              <p class="futura-pt-m-medium mb-0">
                Авторизоваться
              </p>
            </base-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { actionsTypes } from '@/app/entities/auth/shared/state/auth'
  const { required, minLength } = require('vuelidate/lib/validators')

  export default {
    data () {
      return {
        formValid: false,
        form: {
          login: '',
          password: '',
        },
        rules: {
          login: [
            v => required(v) || this.$t('validation.required'),
            v => minLength(2)(v) || this.$t('validation.minLength', { count: 2 }),
          ],
          password: [
            v => required(v) || this.$t('validation.required'),
          ],
        },
      }
    },
    methods: {
      onLogin () {
        if (this.formValid) {
          this.$store.dispatch('auth/auth/' + actionsTypes.LOGIN, this.form)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.logo-img {
  margin-top: 48px;
}
.form {
  & ::v-deep {
    input {
      @include futura-pt-sm-medium;
      &:placeholder {
        @include futura-pt-sm-medium;
      }
    }
  }
  .field-login, .field-password {
    width: 250px;
  }
}
.block-login {
  margin-top: 161px;
}
.card-text {
  padding-top: 24px;
  margin-bottom: 24px;
}
.card-action {
  margin-top: 12px;
  padding-bottom: 46px;
}
</style>
