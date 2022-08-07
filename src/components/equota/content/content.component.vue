<template>
  <div class="container">
    <div class="eq-content">
      <h1>Stock List</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia nisl augue. Vestibulum vehicula
        ante ut tempor pellentesque. Quisque porta lacus vestibulum, ultrices ipsum in, fringilla ligula. Fusce quis
        tempor urna. Nullam vitae libero et leo ultrices eleifend.
      </p>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'eq-content',
  });
</script>
<style lang="scss" scoped>
  .eq-content {
    padding: 48px 0 64px;
    color: #545454;
    font-family: Roboto, sans-serif;
  }
</style>
