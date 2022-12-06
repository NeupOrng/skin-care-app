<template>
  <div class="routine-page">
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoutinePage',
  setup () {
    return {}
  }
})
</script>
