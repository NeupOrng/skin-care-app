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
    dispatch('getPoster')
    console.log(state)
    return {}
  }
})
</script>

<style lang="scss">
:root {
  --theme-color: rgb(24, 197, 180);
}

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
.product-item {
  width: 14.4vw;
  height: 18vw;

  .product-item-image {
    width: 14vw;
    height: 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;
    img {
      max-width: 100%;
    }
  }
}

@media only screen and (max-width: 750px) {
  .product-item {
    width: 44vw;
    height: 60vw;
    padding: 5vw;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    .product-item-image {
      width: 43vw;
      height: 43vw;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 10px;
      img {
        max-width: 100%;
      }
    }
    .product-item-content {
      width: 43vw;
      height: 17vw;
    }
  }
}

</style>
