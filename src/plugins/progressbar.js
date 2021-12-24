import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: 'var(--v-secondary-base)',
  failedColor: 'var(--v-secondary-base)',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: false,
  location: 'top',
  inverse: false,
}

Vue.use(VueProgressBar, options)
