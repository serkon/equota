<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import { createTheme, datePickerDark, dateZhCN, inputDark, zhCN } from 'naive-ui';

  export default defineComponent({
    components: {},
    setup() {
      return {
        darkTheme: createTheme([inputDark, datePickerDark]),
        zhCN,
        dateZhCN,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/assets/scss/importer';
</style>
