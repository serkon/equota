<template>
  <div>
    <eq-header></eq-header>
    <eq-content>
      <div class="content">
        <div class="eq-stock col-md-6">
          <div class="eq-actions">
            <eq-button class="btn-primary" @click="onShowModal">{{
              myStockList.length <= 0 ? 'Add Stock' : 'Add More Stock'
            }}</eq-button>
            <eq-button class="btn-secondary" @click="getStocks">Refresh</eq-button>
          </div>
          <div class="eq-stock-list list">
            <eq-modal v-model:show="showModal"></eq-modal>
            <eq-stock-list v-model="myStockList"></eq-stock-list>
          </div>
        </div>
        <div class="eq-chart col-md-6">
          <eq-chart></eq-chart>
        </div>
      </div>
    </eq-content>
  </div>
</template>
<script lang="ts">
  import { AxiosResponse } from 'axios';
  import { defineComponent, Ref, ref } from 'vue';

  import EqButton from '@/components/equota/button/button.component.vue';
  import EqChart from '@/components/equota/chart/chart.component.vue';
  import EqStockList from '@/components/equota/stock/stock-list.component.vue';
  import instance from '@/components/interceptor/instance';

  import { MyStock, Stock } from './stock.interface';

  interface Data {
    showModal: Ref<boolean>;
  }
  export default defineComponent({
    name: 'dx-equota',
    components: {
      EqButton,
      EqStockList,
      EqChart,
    },
    data(): Data {
      return {
        showModal: ref(false),
      };
    },
    props: {},
    computed: {
      stockList(): Stock[] {
        return this.$store.state.stock.list;
        // return this.$store.getters.getStockList;
      },
      myStockList() {
        const myStocks: { [key: string]: number } = this.$store.getters.getMyStockList;
        const myList: MyStock[] = [];

        Object.entries(myStocks).forEach(([stock, count]) => {
          const filter = this.stockList.find((item) => item.symbol === stock);
          if (filter) {
            myList.push({
              symbol: filter.symbol,
              count,
              lastPrice: filter.lastPrice,
              weightedAvgPrice: filter.weightedAvgPrice,
            });
          }
        });

        return myList;
      },
    },
    created() {
      console.log('created');
      this.initilize();
    },
    methods: {
      initilize(): void {
        console.log('initialize');
        this.getStocks();
        window.setInterval(() => {
          this.getStocks();
          console.log('automatic refreser in 20 minutes');
        }, 1000 * 60 * 20);
      },
      async getStocks(): Promise<void> {
        const response: AxiosResponse<Stock[]> = await instance.get(`${process.env.VUE_APP_STOCK}`);
        if (response.status === 200) {
          this.$store.commit('setStocksMutation', response.data);
        } else {
          console.log('You entered wrong password');
        }
      },
      addToMyStock(item: Stock): void {
        this.$store.commit('addToMyStock', item);
      },
      onShowModal() {
        this.showModal = true;
      },
    },
  });
</script>
<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 12px;

    .eq-stock {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .eq-actions {
        display: flex;
        row-gap: 24px;
        column-gap: 12px;
      }

      .list {
        margin-top: 24px;
        width: 100%;
        border: 1px dashed #e4e4e4;
        border-radius: 4px;
      }
    }

    .eq-chart {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
