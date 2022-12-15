<template>
  <div
    class="product-detail-page gap-5"
    v-loading="isLoading"
  >
    <div class="product-detail-content">
      <div class="w-full flex justify-center items-start">
        <img
          class="max-w-full"
          :src="activeImage.image_path_for_display"
        >
      </div>
      <div class="grid gap-2 py-2">
        <div
          class="w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          v-for="(image, index) in product.product_image"
          :key="index"
          @click="onImageClick(image)"
        >
          <img
            :class="`object-fit ${activeImage.id === image.id ? '' : 'contrast-50'}`"
            :src="image.image_path_for_display"
          >
        </div>
      </div>
    </div>
    <div class="product-detail-content">
      <div class="font-bold text-2xl text-left">
        {{ product.name_en }}
      </div>
      <div class="flex justify-start items-center font-bold my-3">
        <span :class="`${product.discount > 0 ? 'line-through' : ''} text-[#69727B]`">
          ${{ product.price_for_display }}
        </span>
        <span
          v-if="product.discount > 0"
          class="mx-2 text-[#197bbd]"
        >
          ${{ product.discount_for_display }}
        </span>
      </div>
      <div class="w-full flex flex-col items-start justify-center mb-5">
        <span class="my-2 ">{{ $t('quantity ') }}</span>
        <el-input-number
          :min="0"
          v-model="amount"
        />
      </div>
      <el-button
        class="w-full mb-5"
        type="primary"
        @click="addToCart"
      >
        {{ $t('add_to_cart') }}
      </el-button>
      <div class="flex flex-col items-start">
        <span class="font-bold text-md p-3 border-l-[1px] border-r-[1px] border-t-[1px] mb-[-1px] bg-white z-0">{{ $t('description') }}</span>
        <div
          class="border-[1px] p-5 text-left w-full"
          v-html="product.description"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.product-detail-page {
  padding: 15px 10vw;
  width: 100vw;
  display: flex;

  .product-detail-content {
    width: 50%;
  }
}

@media only screen and (max-width: 750px) {
  .product-detail-page {
    padding: 15px 5vw;
    flex-direction: column;

    .product-detail-content {
      width: 100%;
    }
  }
}
</style>
<script lang="ts">
import { IProduct, Product } from '@/model/product'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { useRoute } from 'vue-router'
import apiService from '@/libraries/apiService'
import { IImage, ImageDto } from '@/model/image'

export default defineComponent({
  name: 'ProductDetailPage',
  setup () {
    const product = ref<Product>()
    const activeImage = ref<IImage>()
    const { params } = useRoute()
    const isLoading = ref(false)
    const amount = ref(1)
    console.log(router, params.id)
    const { commit } = useStore()
    const getProductById = async () => {
      isLoading.value = true
      product.value = await apiService.getProductById(String(params.id))
      activeImage.value = product.value.product_image[0]
      isLoading.value = false
    }
    getProductById()
    const onImageClick = (params: IImage) => {
      activeImage.value = params
    }
    const addToCart = () => {
      commit('addCartItem', { product: product.value, amount: amount.value })
      router.push('/cart')
    }
    return {
      product,
      amount,
      isLoading,
      activeImage,
      onImageClick,
      addToCart
    }
  }
})
</script>
