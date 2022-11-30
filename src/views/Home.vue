<template>
  <div class="home">
    <el-carousel class="banner" :loop="true" interval="5000" :pause-on-hover="true">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="w-full flex justify-center items-center">
          <img class="max-w-full max-h-full" :src="item" :alt="`banner ${index}`" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="w-[100vw] flex flex-col items-center product-show-container">
      <div class="text-xl font-bold text-black uppercase">{{ $t('new_arrivals') }}</div>
      <div class="products-container gap-[2vw]">
        <router-link class="product-item" v-for="(product, index) in products" :key="index"
          :to="`/product-detail/${product.Id}`">
          <div class="product-item-image">
            <img :src="product.ImagePath" />
          </div>
          <div class="product-item-content flex flex-col">
            <span class="product-name">{{ product.Name }}</span>
            <div class="inline font-bold">
              <span :class="`${product.Discount > 0 ? 'line-through' : ''} text-[#69727B]`">
                ${{ product.PriceForDisplay }}
              </span>
              <span v-if="product.Discount > 0" class="mx-2 text-[#197bbd]">
                ${{ product.DiscountForDisplay }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="w-[100vw] flex flex-col items-center product-show-container">
      <div class="text-xl font-bold text-black uppercase">{{ $t('must_try') }}</div>
      <div class="products-container gap-[2vw]">
        <router-link class="product-item" v-for="(product, index) in products" :key="index"
          :to="`/product-detail/${product.Id}`">
          <div class="product-item-image">
            <img :src="product.ImagePath" />
          </div>
          <div class="product-item-content flex flex-col">
            <span class="product-name">{{ product.Name }}</span>
            <div class="inline font-bold">
              <span :class="`${product.Discount > 0 ? 'line-through' : ''} text-[#69727B]`">
                ${{ product.PriceForDisplay }}
              </span>
              <span v-if="product.Discount > 0" class="mx-2 text-[#197bbd]">
                ${{ product.DiscountForDisplay }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.product-show-container {
  padding: 25px 0 0;
}
.product-item {
  width: 14.4vw;
}
.banner {
  height: fit-content;
  .el-carousel__container {
    height: 45vw;
  }
}

.product-item:hover {
  .product-name {
    text-decoration: underline;
  }
}

.products-container {
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 10px 10vw 0;
}

@media only screen and (max-width: 750px) {
  .products-container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    padding: 10px 5vw;
  }
  .product-item {
    width: 44vw;
    padding: 5vw;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
  }

  .banner {
    height: fit-content;
    .el-carousel__container {
      height: 55vw;
    }
  }
}
</style>

<script lang="ts">
import { IProduct, Product } from '@/model/product'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import fakeProducts from '@/libraries/fakeData/products'

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
    const products = ref<Array<Product>>(fakeProducts.map((item) => new Product(item)).slice(0, 5))
    return {
      banners,
      addCart,
      removeCart,
      products
    }
  }
})
</script>
