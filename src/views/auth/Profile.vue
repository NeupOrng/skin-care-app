<template>
  <div class="profile-page">
    <div class="w-full flex flex-col items-center justify-center p-5">
      <span class="font-bold text-3xl">{{ $t('my_account' )}}</span>
      <span class="cursor-pointer">{{ $t('log_out') }}</span>
    </div>
    <div class="w-full flex items-center justify-between">
      <div class="w-fit flex flex-col items-start">
        <span class="font-bold text-xl mb-5">{{ $t('order_history') }}</span>
        <div>{{$t("You_haven't_placed_any_orders_yet.")}}</div>
      </div>
      <div class="w-fit flex flex-col items-start">
        <span class="font-bold text-xl mb-5">{{ $t('account_detail') }}</span>
        <div>Neup Orng</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
.profile-page {
  padding: 10px 10vw 20px;
}

@media only screen and (max-width: 750px) {
  .profile-page {
    padding: 0 10vw;
  }
}
</style>
