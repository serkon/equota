import { ActionContext, createStore, Store } from 'vuex';

import { Stock } from '@/views/equota/stock.interface';

export interface State {
  products: Product[];
  stock: { list: Stock[]; my: { [key: string]: number } };
}

export interface Product {
  name: string;
  count: number;
}

export default createStore({
  state: {
    products: [],
    stock: { list: [], my: { ETHBTC: 3, LTCBTC: 2 } },
  },
  getters: {
    // getters = Computed value (state,)
    // this.$store.getters.getProducts
    getStockList(state: State, getters): Stock[] {
      return state.stock.list;
    },
    getMyStockList(state: State, getters) {
      // console.log(getters);
      return state.stock.my;
    },
  },
  actions: {
    // fetch
    removeStockAction(this: Store<State>, store: ActionContext<State, State>, stock: Stock): void {
      // or use without this: removeStockAction(store: ActionContext<State, State>, value: any) {
      store.commit('removeStockMutation', stock);
    },
    decreaseStockAction(this: Store<State>, store: ActionContext<State, State>, stock: Stock): void {
      const count = store.state.stock.my[stock.symbol];
      store.commit(!isNaN(count) && Number(count) > 0 ? 'decreaseStockMutation' : 'removeStockMutation', stock);
    },
  },
  mutations: {
    // setters = Methods(state, value)
    // usage in component this.$store.commit('addProduct', {name: 'kabak', count: 21})
    increaseStockMutation(state, stock: Stock) {
      let count = state.stock.my[stock.symbol];
      state.stock.my[stock.symbol] = !isNaN(count) ? ++count : 1;
    },
    decreaseStockMutation(state: State, stock: Stock) {
      state.stock.my[stock.symbol] = --state.stock.my[stock.symbol];
    },
    updateStockMutation(state: State, stock: Stock) {
      state.stock.my[stock.symbol] = stock.count;
    },
    removeStockMutation(state: State, stock: Stock) {
      delete state.stock.my[stock.symbol];
    },
    setStocksMutation(state, stocks: Stock[]) {
      state.stock.list = stocks;
    },
  },
});
