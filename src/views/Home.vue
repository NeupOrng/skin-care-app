<template>
  <div
    class="home"
    v-loading="isLoading"
  >
  <el-carousel
      class="poster"
      :loop="true"
      interval="2000"
      :pause-on-hover="true"
    >
      <el-carousel-item
        v-for="(item, index) in allPoster[0].poster_image"
        :key="index"
      >
        <div class="w-full flex justify-center items-center">
          <img
            class="max-w-full max-h-full"
            :src="item.image_path_for_display"
            @load="onImageLoad(item)"
            :alt="poster ${index}"
          >
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="w-[100vw] flex flex-col items-center product-show-container">
      <div class="text-xl font-bold text-black uppercase">
        {{ $t('new_arrivals') }}
      </div>
      <div class="products-container gap-[2vw]">
        <router-link
          class="product-item"
          v-for="(product, index) in newProducts"
          :key="index"
          :to="`/product-detail/${product.id}`"
        >
          <div class="product-item-image relative">
            <img
              :src="product.product_image[0].image_path_for_display"
              @load="onImageLoad(product.product_image[0])"
            >
            <div
              v-if="product.product_image[0].is_loading"
              :class="`absolute w-full aspect-square top-0 left-0 bg-blue-50 transition duration-300 ease-out ${product.product_image[0].is_loading ? '' : 'opacity-0'}`"
            />
          </div>
          <div class="product-item-content flex flex-col">
            <span class="product-name">{{ product.name_en }}</span>
            <div class="inline font-bold">
              <span :class="`${product.discount_for_display > 0 ? 'line-through' : ''} text-[#69727B]`">
                ${{ product.price_for_display }}
              </span>
              <span
                v-if="product.discount > 0"
                class="mx-2 text-[#197bbd]"
              >
                ${{ product.discount_for_display }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="w-[100vw] flex flex-col items-center product-show-container">
      <div class="text-xl font-bold text-black uppercase">
        {{ $t('must_try') }}
      </div>
      <div class="products-container gap-[2vw]">
        <router-link
          class="product-item"
          v-for="(product, index) in bestSellingProducts"
          :key="index"
          :to="`/product-detail/${product.id}`"
        >
          <div class="product-item-image relative">
            <img
              :src="product.product_image[0].image_path_for_display"
              @load="onImageLoad(product.product_image[0])"
            >
            <div
              v-if="product.product_image[0].is_loading"
              :class="`absolute w-full aspect-square top-0 left-0 bg-blue-50 transition duration-300 ease-out ${product.product_image[0].is_loading ? '' : 'opacity-0'}`"
            />
          </div>
          <div class="product-item-content flex flex-col">
            <span class="product-name">{{ product.name_en }}</span>
            <div class="inline font-bold">
              <span :class="`${product.discount_for_display > 0 ? 'line-through' : ''} text-[#69727B]`">
                ${{ product.price_for_display }}
              </span>
              <span
                v-if="product.discount > 0"
                class="mx-2 text-[#197bbd]"
              >
                ${{ product.discount_for_display }}
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
.poster {
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

  .poster {
    height: fit-content;
    .el-carousel__container {
      height: 55vw;
    }
  }
}
</style>

<script lang="ts">
import apiService from '@/libraries/apiService'
import { ImageDto } from '@/model/image'
import { IPoster, Poster } from '@/model/poster'
import { IProduct, Product } from '@/model/product'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
// import fakeProducts from '@/libraries/fakeData/products'

export default defineComponent({
  name: 'HomePage',
  setup () {
    const banners = ref<Array<string>>([
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/black_friday_cover.png?v=1668957836',
      'https://cdn.shopify.com/s/files/1/0020/8184/9444/files/PCmain_banner.jpg?v=1658821083'
    ])
    const { commit } = useStore()
    const isLoading = ref(false)
    const newProducts = ref<Array<Product>>([])
    const bestSellingProducts = ref<Array<Product>>([])
    const allPoster = ref<Array<IPoster>>([])
    const getNewProduct = async () => {
      isLoading.value = true
      const products = await apiService.getAllProducts()
      if (products.length > 5) {
        newProducts.value = products.slice(0, 5)
      } else {
        newProducts.value = products
      }
      isLoading.value = false
    }

    const getBestSellingProduct = async () => {
      isLoading.value = true
      const products = await apiService.getProductByFilter('bestSelling')
      if (products.length > 5) {
        bestSellingProducts.value = products.splice(0, 5)
      } else {
        bestSellingProducts.value = products
      }
      isLoading.value = false
    }
    const getNewPoster = async () => {
      isLoading.value = true
      const poster = await apiService.getAllPoster()
      allPoster.value = poster
      isLoading.value = false
    }
    const onImageLoad = (image: ImageDto) => {
      image.is_loading = false
    }

    getBestSellingProduct()
    getNewProduct()
    getNewPoster()
    return {
      banners,
      bestSellingProducts,
      newProducts,
      isLoading,
      allPoster,
      onImageLoad
    }
  }
})
</script>
