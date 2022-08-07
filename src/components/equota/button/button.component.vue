<template>
  <button v-bind="$attrs" class="btn">
    <slot />
  </button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'eq-button',
  });
</script>
