<template>
  <section class="eq-stock-list-component">
    <template v-for="(item, key) of items" v-bind:key="key">
      <eq-stock v-model="items[key]"></eq-stock>
    </template>
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { MyStock } from '@/views/equota/stock.interface';

  export default defineComponent({
    name: 'eq-stock-list',
    props: {
      modelValue: {
        type: Array as PropType<MyStock[]>,
        required: true,
      },
    },
    computed: {
      items: {
        get(): MyStock[] {
          return this.modelValue;
        },
        set(newValue: MyStock[]) {
          this.$emit('update:modelValue', newValue);
        },
      },
    },
  });
</script>
<style lang="scss" scoped>
  .eq-stock-list-component {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 24px;
    row-gap: 12px;
  }
</style>
