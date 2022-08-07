<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    title="Stock Finder"
    :bordered="false"
    size="huge"
    transform-origin="center"
  >
    <input
      type="text"
      v-model="search"
      class="form-control form-control-lg"
      placeholder="Search"
      @input="searchStock"
    />
    <div class="eq-stock-finder-list">
      <div class="not-searched" v-if="search.length <= 0">
        <div>Please start typing for result.</div>
        <div class="sample">For example: LTCBTC, BNBBTC or NEOBTC</div>
      </div>
      <div class="no-result" v-if="search.length > 0 && found.length <= 0">No result were found.</div>
      <div class="result" v-if="search.length > 0 && found.length > 0">
        <eq-stock-list v-model="found"></eq-stock-list>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts">
  import { NModal } from 'naive-ui';
  import { defineComponent } from 'vue';

  import { MyStock, Stock } from '@/views/equota/stock.interface';

  interface Data {
    search: string;
    found: MyStock[];
  }

  export default defineComponent({
    name: 'eq-modal',
    components: {
      NModal,
    },
    emits: ['update:show'],
    computed: {
      showModal: {
        get(): boolean {
          return this.show;
        },
        set(newValue: boolean) {
          this.$emit('update:show', newValue);
        },
      },
      stockList(): Stock[] {
        return this.$store.state.stock.list;
        // return this.$store.getters.getStockList;
      },
      myStockList() {
        const myStocks: { [key: string]: number } = this.$store.getters.getMyStockList;
        const myList: MyStock[] = [];
        console.log('get myStockList');

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
      result(): MyStock[] {
        const myStocks: { [key: string]: number } = this.$store.getters.getMyStockList;
        const stockList: Stock[] = this.$store.getters.getStockList as Stock[];
        const found: MyStock[] = [];

        stockList.forEach((stock: Stock) => {
          const filter = stock.symbol.includes(this.search.toUpperCase());
          const isInMyStock = myStocks[stock.symbol] !== undefined;
          if (filter) {
            found.push({
              symbol: stock.symbol,
              count: isInMyStock ? myStocks[stock.symbol] : 0,
              lastPrice: stock.lastPrice,
              weightedAvgPrice: stock.weightedAvgPrice,
            });
          }
        });

        return found;
      },
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data(): Data {
      return {
        search: '',
        found: [],
      };
    },
    watch: {
      result() {
        this.searchStock();
      },
      show() {
        this.search = '';
        this.found = [];
      },
    },
    methods: {
      searchStock() {
        this.found = this.result;
      },
      addStock(stock: Stock): void {
        this.$store.commit('addStock', stock);
        this.showModal = false;
      },
    },
  });
</script>
<style lang="scss">
  .custom-card {
    max-width: 960px;

    .eq-stock-finder-list {
      margin-top: 24px;
      max-height: 450px;
      border: 1px dashed #e4e4e4;
      border-radius: 4px;
      font-family: Roboto, sans-serif;
      overflow-y: auto;

      .no-result,
      .not-searched {
        padding: 24px;
        color: #999999;
        font-size: 18px;
        text-align: center;

        .sample {
          font-size: 14px;
        }
      }
    }
  }
</style>
