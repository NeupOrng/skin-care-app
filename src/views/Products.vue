<template>
  <div class="product-page">
    {{ $route.params.filter }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductPage',
  setup () {
    return {}
  }
})
</script>
