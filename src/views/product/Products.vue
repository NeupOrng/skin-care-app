<template>
  <div class="product-page">
    <div class="w-[100vw] py-[25px] flex items-center justify-center border-b-[1px]">
      <span class="font-bold text-2xl">{{ $t($route.params.filter) }}</span>
    </div>
    <div class="w-[100vw] py-[10px] px-[10vw] flex items-center product-filter border-b-[1px] border-t-[1px]">
      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <span>{{ $t('filter_by') }}</span>
          <el-select v-model="filterByModel">
            <el-option value="all_products">
              {{ $t('all_products') }}
            </el-option>
          </el-select>
        </div>
      </div>
      <span class="inner-total-product text-sm italic">{{ `${products.length} ${$t('products')}` }}</span>
    </div>
    <span class="outer-total-product text-sm italic">{{ `${products.length} ${$t('products')}` }}</span>
    <div class="product-render-container">
      <router-link
        class="product-item"
        v-for="(product, index) in products"
        :key="index"
        :to="`/product-detail/${product.id}`"
      >
        <div class="product-item-image p-3">
          <img :src="product.product_image[0].image_path_for_display">
        </div>
        <div class="product-item-content flex flex-col">
          <span class="product-name">{{ product.name_en }}</span>
          <div class="inline font-bold">
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
        </div>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss">
.product-filter {
  justify-content: space-between;
}

.inner-total-product {
  display: block;
}

.outer-total-product {
  width: 100vw;
  padding: 5px 10vw;
  text-align: left;
  display: none;
}

.product-render-container {
  padding: 10px 10vw 20px;
  min-height: calc(50vh - 72.99px - 82.99px - 53.98px - 157.99px - 114.43px);
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  .product-item:hover {
    .product-name {
      text-decoration: underline;
    }
  }
}

@media only screen and (max-width: 750px) {
  .product-filter {
    justify-content: start;
  }

  .inner-total-product {
    display: none;
  }

  .outer-total-product {
    display: block;
  }

  .product-render-container {
    padding: 5px 5vw;
    min-height: calc(100vh - 72.99px - 82.99px - 53.98px - 157.99px - 114.43px);
    grid-template-columns: 1fr 1fr;
  }
}
</style>
<script lang="ts">
import apiService from '@/libraries/apiService'
import { Product } from '@/model/product'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProductPage',
  setup () {
    const filterByModel = ref('all_products')
    const products = ref<Array<Product>>([])
    const getAllProduct = async () => {
      products.value = await apiService.getAllProducts()
    }
    getAllProduct()
    return {
      filterByModel,
      products
    }
  }
})
</script>
