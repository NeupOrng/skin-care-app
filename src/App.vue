<template>
  <div class="min-h-[100vh] relative">
    <navigator />
    <div class="flex flex-col justify-between body-container">
      <router-view />
      <footer-component />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Navigator from '@/components/Navigator.vue'
import FooterComponent from './components/Footer.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Navigator,
    FooterComponent
  },
  setup () {
    const { dispatch, state } = useStore()
    dispatch('getAllProductTypes')
    console.log(state)
    return {}
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.body-container {
  width: 100vw;
  min-height: calc(100vh - 60px);
}
</style>
