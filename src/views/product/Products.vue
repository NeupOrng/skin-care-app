<template>
  <div
    class="product-page"
    v-loading="isLoading"
  >
    <div class="w-[100vw] py-[25px] flex items-center justify-center border-b-[1px]">
      <span class="font-bold text-2xl">{{ $t(filterKey) }}</span>
    </div>
    <div class="w-[100vw] py-[10px] px-[10vw] flex items-center product-filter border-b-[1px] border-t-[1px]">
      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <span>{{ $t('filter') }}</span>
          <el-select v-model="filterByModel">
            <el-option
              value="0"
              :label="$t('all')"
            />
            <el-option
              v-for="(item, index) in $store.state.productTypes"
              :key="index"
              :value="item.id"
              :label="item.name_en"
            />
          </el-select>
        </div>
      </div>
      <span class="inner-total-product text-sm italic">{{ `${products.length} ${$t('products')}` }}</span>
    </div>
    <span class="outer-total-product text-sm italic">{{ `${products.length} ${$t('products')}` }}</span>
    <div class="product-render-container gap-3">
      <router-link
        class="product-item"
        v-for="(product, index) in products"
        :key="index"
        :to="`/product-detail/${product.id}`"
      >
        <div class="product-item-image relative aspect-square p-1">
          <img
            :src="product.product_image[0].image_path_for_display"
            @load="onImageLoad(product.product_image[0])"
          >
          <div
            :class="`absolute w-full aspect-square top-0 left-0 bg-blue-50 transition duration-300 ease-out ${product.product_image[0].is_loading ? '' : 'opacity-0'}`"
          />
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
/* eslint-disable */ 
import apiService from '@/libraries/apiService'
import { IImage, ImageDto } from '@/model/image'
import { Product } from '@/model/product'
import { defineComponent, ref, toRef, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductPage',
  props: {
    filterKey: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const filterByModel = ref('0')
    const filterKey = ref('')
    const isLoading = ref(false)
    const products = ref<Array<Product>>([])
    const getAllProduct = async () => {
      isLoading.value = true
      products.value = await apiService.getAllProducts()
      isLoading.value = false
    }
    const getProductByFilterKey = async (key: string) => {
      isLoading.value = true
      products.value = await apiService.getProductByFilter(key)
      isLoading.value = false
    }
    const getProductByProductType = async (id: string) => {
      isLoading.value = true
      products.value = await apiService.getProductByProductType(id)
      isLoading.value = false
    }
    const onImageLoad = (image: ImageDto) => {
      image.is_loading = false
    }


    const filter = toRef(props, 'filterKey')
    watch(filter, (newVal) => {
      if (newVal === 'bestSelling') {
        getProductByFilterKey('bestSelling')
      } else {
        getAllProduct()
      }
    })
    if (filter.value === 'bestSelling') {
      getProductByFilterKey('bestSelling')
    } else {
      getAllProduct()
    }



    watch(filterByModel, (newVal) => {
      if (newVal === '0') {
        getAllProduct()
      } else {
        getProductByProductType(newVal)
      }
    })
    return {
      filterByModel,
      products,
      isLoading,
      onImageLoad
    }
  }
})
</script>