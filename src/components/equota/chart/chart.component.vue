<template><DoughnutChart :chartData="testData" /></template>
<script lang="ts">
  import { Chart, registerables } from 'chart.js';
  import { defineComponent } from 'vue';
  import { DoughnutChart } from 'vue-chart-3';

  import { MyStock } from '@/views/equota/stock.interface';

  Chart.register(...registerables);

  export default defineComponent({
    name: 'Home',
    components: { DoughnutChart },
    computed: {
      store(): MyStock {
        return this.$store.getters.getMyStockList;
      },
      testData(): { labels: string[]; datasets: [{ data: number[]; backgroundColor: string[] }] } {
        return {
          labels: Object.keys(this.store),
          datasets: [
            {
              data: Object.values(this.store),
              backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
            },
          ],
        };
      },
    },
  });
</script>
