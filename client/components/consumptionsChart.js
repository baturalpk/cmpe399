import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: {
        title: {
          display: true,
          text: 'Recent power consumption records'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
