<template>
  <section class="eq-stock-component" v-if="item">
    <aside class="info">
      <h3>{{ item.symbol }}</h3>
      <div class="price">
        <span>{{ item.lastPrice }}</span>
        <span>-</span>
        <span>{{ item.weightedAvgPrice }}</span>
      </div>
    </aside>
    <aside>
      <input type="number" v-bind:value="item.count" class="form-control" ref="myInput" @input="checkInputStatus" />
    </aside>
    <aside class="actions">
      <eq-button v-on:click="removeStock(item)" class="btn-outline-danger"><i class="bi bi-trash"></i></eq-button>
      <eq-button v-on:click="updateStock(item)" class="btn-outline-secondary" :disabled="disable">update</eq-button>
      <eq-button v-on:click="decreaseStock(item)" class="btn-outline-primary" :disabled="item.count <= 1"
        ><i class="bi bi-dash"></i
      ></eq-button>
      <eq-button v-on:click="increaseStock(item)" class="btn-outline-primary"><i class="bi bi-plus"></i></eq-button>
    </aside>
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { MyStock } from '@/views/equota/stock.interface';

  export default defineComponent({
    name: 'eq-stock',
    props: {
      modelValue: {
        type: [Object] as PropType<MyStock>,
        required: true,
        default: null,
      },
    },
    computed: {
      item: {
        get(): MyStock {
          return this.modelValue;
        },
        set(newValue: MyStock) {
          this.$emit('update:modelValue', newValue);
        },
      },
    },
    data() {
      return {
        disable: false,
      };
    },
    methods: {
      checkInputStatus() {
        console.log('changed');
        if (this.$refs.myInput) {
          const input = this.$refs.myInput as HTMLInputElement;
          if (Number(input.value) < 1) {
            input.value = Number(input.value) === 0 ? '1' : Math.abs(Number(input.value)).toString();
          }
          this.disable = Number(input.value) <= 0;
          console.log(input.value);
        }
      },
      increaseStock(item: MyStock): void {
        this.$store.commit('increaseStockMutation', item);
      },
      decreaseStock(item: MyStock): void {
        this.$store.dispatch('decreaseStockAction', item).then((response) => {
          console.log('decrased', response);
        });
      },
      updateStock(item: MyStock): void {
        console.log('updateStock', item, Number((this.$refs?.myInput as HTMLInputElement).value));
        this.$store.commit('updateStockMutation', {
          ...item,
          count: Number((this.$refs?.myInput as HTMLInputElement).value),
        });
      },
      removeStock(item: MyStock): void {
        this.$store.dispatch('removeStockAction', item).then((response) => {
          console.log('cleaned', response);
        });
      },
    },
  });
</script>

<style lang="scss" scoped>
  .eq-stock-component {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    column-gap: 12px;

    .info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .price {
        display: flex;
        font-size: 12px;
        column-gap: 4px;
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      column-gap: 12px;
    }
  }
</style>
