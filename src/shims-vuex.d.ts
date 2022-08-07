// vuex.d.ts
// import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

import { State } from './store';

declare module '@vue/runtime-core' {
  // declare your own store states
  // interface State {
  //   products: Products[];
  //   loading: LoadingStore;
  // }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
