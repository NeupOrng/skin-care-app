<template>
  <div class="home">
    <el-carousel height="85vh" :loop="true" interval="5000" :pause-on-hover="true">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="w-full flex justify-center items-center">
          <img class="max-w-full max-h-full" :src="item" :alt="`banner ${index}`" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup () {
    const banners = ref<Array<string>>([
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/black_friday_cover.png?v=1668957836',
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/PCmain_banner.jpg?v=1658821083'
    ])
    return {
      banners
    }
  }
})
</script>
