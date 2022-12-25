<template>
  <div class="your-cart w-[100vw]">
    <div
      class="w-full desktop-container"
      v-if="$store.getters.getCountCartItem > 0"
    >
      <div class="font-bold items-center justify-center w-full text-3xl my-[20px]">
        {{ $t('your_cart') }}
      </div>
      <div class="product-list gap-5 grid-cols-8 grid header border-b-[1px] pb-5">
        <div class="col-span-5 flex justify-start items-center">
          {{ $t('product') }}
        </div>
        <div class="flex items-center flex justify-center">
          {{ $t('price') }}
        </div>
        <div class="flex items-center flex justify-center">
          {{ $t('quantity') }}
        </div>
        <div class="flex items-center flex justify-center">
          {{ $t('total') }}
        </div>
      </div>
      <div
        v-for="(item, index) in $store.getters.getAllCartItems"
        :key="index"
        class="product-list grid-cols-8 gap-5 grid border-b-[1px] py-5"
      >
        <div class="col-span-5 flex gap-5 justify-start items-center">
          <div class="w-[100px] h-[100px]">
            <img
              class="max-w-full"
              :src="item.product_image[0].image_path_for_display"
            >
          </div>
          <div class="flex flex-col justify-between h-full py-3 items-start">
            <div class="text-md text-left">
              {{ item.name_en }}
            </div>
            <el-button @click="removeItemFromCart(item)">
              {{ $t('remove') }}
            </el-button>
          </div>
        </div>
        <div class="flex items-center justify-center">
          ${{ item.discount_for_display }}
        </div>
        <div class="flex items-center flex flex-col justify-center items-center">
          <el-input-number
            size="small"
            class="custom-input-number"
            controls-position="right"
            :min="0"
            v-model="item.amount"
          />
        </div>
        <div class="flex items-center justify-end px-5">
          ${{ item.total_price }}
        </div>
      </div>
      <div class="py-[20px] px-5 gap-[80px] flex items-center justify-end">
        <span>{{ $t('sub_total') }}</span>
        <span>${{ $store.getters.getTotalPrice }}</span>
      </div>
      <div class="flex gap-5 justify-end">
        <router-link to="/products/all">
          <el-button type="primary">
            {{ $t('continue_shopping') }}
          </el-button>
        </router-link>
        <el-button type="primary">
          {{ $t('checkout') }}
        </el-button>
      </div>
    </div>
    <div
      class="w-full mobile-container"
      v-if="$store.getters.getCountCartItem > 0"
    >
      <div class="font-bold items-center justify-center w-full text-3xl my-[20px]">
        {{ $t('your_cart') }}
      </div>
      <div class="product-list gap-5 grid-cols-6 grid header border-b-[1px] pb-5">
        <div class="col-span-5 flex justify-start items-center">
          {{ $t('product') }}
        </div>
        <div class="flex items-center flex justify-end">
          {{ $t('price') }}
        </div>
      </div>
      <div
        v-for="(item, index) in $store.getters.getAllCartItems"
        :key="index"
        class="flex flex-col border-b-[1px] py-5"
      >
        <div class="product-list grid-cols-6 gap-5 grid">
          <div class="col-span-5 flex gap-5 justify-start items-center">
            <div class="w-[100px] h-[100px]">
              <img
                class="max-w-full"
                :src="item.product_image[0].image_path_for_display"
              >
            </div>
            <div class="flex justify-start h-full py-3 items-start">
              <div class="text-md text-left">
                {{ item.name_en }} (x{{ item.amount }})
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end justify-center">
            <span>${{ item.discount_for_display }}</span>
            <el-button
              type="danger"
              @click="onCancel(item)"
              v-if="item.is_editing"
            >
              {{ $t('cancel') }}
            </el-button>
            <el-button
              plain
              @click="onEdit(item)"
              v-else
            >
              {{ $t('edit') }}
            </el-button>
          </div>
        </div>
        <div
          v-if="item.is_editing"
          class="flex justify-between pt-3"
        >
          <el-button
            @click="removeItemFromCart(item)"
            plain
          >
            {{ $t('remove') }}
          </el-button>
          <el-input-number v-model="item.amount_model" />
          <el-button
            type="primary"
            @click="onUpdate(item)"
          >
            {{ $t('update') }}
          </el-button>
        </div>
      </div>
      <div class="py-[20px] px-5 gap-[80px] flex items-center justify-end">
        <span>{{ $t('sub_total') }}</span>
        <span>${{ $store.getters.getTotalPrice }}</span>
      </div>
      <div class="flex gap-5 justify-end">
        <router-link to="/products/all">
          <el-button type="primary">
            {{ $t('continue_shopping') }}
          </el-button>
        </router-link>
        <el-button type="primary">
          {{ $t('checkout') }}
        </el-button>
      </div>
    </div>

    <div
      class="w-full py-[50px]"
      v-else
    >
      <div class="font-bold items-center justify-center w-full text-3xl my-[20px]">
        {{ $t('your_cart') }}
      </div>
      <div class="text-md py-5">
        {{ $t('your_cart_is_currently_empty') }}
      </div>
      <div class="">
        <router-link to="/products/all">
          <el-button type="primary">
            {{ $t('continue_shopping') }}
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { IProduct, ProductInCart } from '@/model/product'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CartPage',
  setup () {
    const { commit, dispatch } = useStore()
    const removeItemFromCart = (item: IProduct) => {
      commit('removeCartItem', item.id)
    }
    const onEdit = (cartItem: ProductInCart) => {
      cartItem.is_editing = true
    }
    const onCancel = (cartItem: ProductInCart) => {
      cartItem.is_editing = false
      cartItem.cancelEditAmount()
    }
    const onUpdate = (cartItem: ProductInCart) => {
      cartItem.is_editing = false
      cartItem.updateAmount()
    }
    dispatch('getCartProductsInCart')
    return {
      removeItemFromCart,
      onEdit,
      onCancel,
      onUpdate
    }
  }
})
</script>

<style lang="scss">
.your-cart {
  padding: 15px 8vw;
}
.desktop-container {
  display: block;
}
.mobile-container {
  display: none;
}
.custom-input-number.el-input-number--small {
  width: 100px;
  .el-input__wrapper {
    padding: 0 15px;
    text-align: left;
    .el-input__inner {
      text-align: left;
    }
  }
}
@media only screen and (max-width: 750px) {
  .desktop-container {
    display: none;
  }
  .mobile-container {
    display: block;
  }
}
</style>
