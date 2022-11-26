<template>
  <div class="home">
    <el-carousel height="85vh" :loop="true" interval="5000" :pause-on-hover="true">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="w-full flex justify-center items-center">
          <img class="max-w-full max-h-full" :src="item" :alt="`banner ${index}`" />
        </div>
      </el-carousel-item>
    </el-carousel>
    {{ $store.state.cartItem }}
    <el-button @click="addCart">add cart test</el-button>
    <el-button @click="removeCart">remove cart</el-button>
  </div>
</template>

<script lang="ts">
import { IProduct } from '@/model/product'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HomePage',
  setup () {
    const banners = ref<Array<string>>([
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/black_friday_cover.png?v=1668957836',
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/PCmain_banner.jpg?v=1658821083'
    ])
    const { commit } = useStore()
    const addCart = () => {
      const temObject: IProduct = {
        Id: 1,
        Name: 'Sun Protection',
        Description: 'protect skin from uv',
        ImagePath: '',
        Price: 1,
        Discount: 0,
        Categories: ['cream']
      }
      commit('addCartItem', { product: temObject, amount: 1 })
    }
    const removeCart = () => {
      commit('removeCartItem', { productId: 1, amount: 1 })
    }
    return {
      banners,
      addCart,
      removeCart
    }
  }
})
</script>
