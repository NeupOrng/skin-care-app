<template>
  <div class="product-detail-page">
    <div class="product-detail-content">
      <div class="w-full flex justify-center items-start">
        <img class="max-w-full" :src="product.ImagePath">
      </div>
    </div>
    <div class="product-detail-content">
      <div class="font-bold text-2xl text-left">{{ product.Name }}</div>
      <div class="flex justify-start items-center font-bold my-5">
        <span :class="`${product.Discount > 0 ? 'line-through' : ''} text-[#69727B]`">
          ${{ product.PriceForDisplay }}
        </span>
        <span v-if="product.Discount > 0" class="mx-2 text-[#197bbd]">
          ${{ product.DiscountForDisplay }}
        </span>
      </div>
      <div class="w-full flex flex-col items-start justify-center mb-5">
        <span class="my-2 ">{{ $t('quantity ')}}</span>
        <el-input-number v-model="amount" />
      </div>
      <el-button class="w-full mb-5" type="primary" @click="addToCart">{{ $t('add_to_cart') }}</el-button>
      <div class="flex flex-col items-start">
        <span class="font-bold text-md p-3 border-l-[1px] border-r-[1px] border-t-[1px] mb-[-1px] bg-white z-0">{{ $t('description') }}</span>
        <div class="border-[1px] p-5 text-left" v-html="product.Description"></div>
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
import fakeProducts from '@/libraries/fakeData/products'
import { IProduct, Product } from '@/model/product'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'ProductDetailPage',
  setup () {
    const product = ref<Product>(new Product(fakeProducts[0]))
    const amount = ref(1)
    const { commit } = useStore()
    const addToCart = () => {
      const temObject: IProduct = product.value
      commit('addCartItem', { product: temObject, amount: amount.value })
      router.push('/cart')
    }
    return {
      product,
      amount,
      addToCart
    }
  }
})
</script>
