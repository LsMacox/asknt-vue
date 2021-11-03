<template>
  <div
    class="wrapper"
    style="max-width: 100%"
  >
    <canvas
      id="canvas-chartjs"
      ref="canvas-chartjs"
      style="max-width: 100%"
      :width="width ? width : ''"
      :height="height ? height : ''"
    />
  </div>
</template>
<script>
  import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  } from 'chart.js'

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  )

  Chart.defaults.font.family = 'Roboto, sans-serif'
  Chart.defaults.font.weight = 400
  Chart.defaults.color = '#171717'

  export default {
    name: 'Chart',
    props: {
      type: {
        type: String,
        default: 'line',
      },
      data: {
        type: Object,
        default: null,
      },
      options: {
        type: Object,
        default: null,
      },
      plugins: {
        type: Array,
        default () {
          return []
        },
      },
      width: [Number, String],
      height: {
        type: [Number, String],
        default: 100,
      },
    },
    data () {
      return {
        $_chart: null,
        animation: {
          duration: 300,
          easing: 'linear',
        },
      }
    },
    computed: {
      existInstance () {
        return !!this.$_chart && this.$_chart instanceof Chart
      },
    },
    watch: {
      options: function () {
        this.updateChart()
      },
      data: function () {
        this.updateChart()
      },
    },
    mounted () {
      this.createChart()
    },
    created () {
      window.addEventListener('resize', this.handleResize)
    },
    destroyed () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      createChart () {
        this.$_chart = new Chart(this.$refs['canvas-chartjs'], {
          type: this.type,
          data: this.data,
          options: this.options,
          plugins: this.plugins,
        })
        this.$_chart.render(this.animation)
      },
      updateChart () {
        if (!this.existInstance) return

        this.$_chart.data.datasets = this.data.datasets
        this.$_chart.data.labels = this.data.labels
        this.$_chart.update()
      },
      handleResize () {
        this.updateChart()
      },
    },
  }
</script>
