<template>
  <div class="eq-header">
    <img src="./logo.svg" alt="Logo" class="logo" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'eq-header',
  });
</script>
<style lang="scss" scoped>
  .eq-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    background-color: #ffffff;

    img.logo {
      height: 40px;
    }
  }
</style>
