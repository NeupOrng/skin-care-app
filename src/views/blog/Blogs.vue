<template>
  <div class="blogs-page w-[100vw]">
    <div class="w-full flex items-center justify-center py-[25px] border-b-[1px]">
      <span class="font-bold text-2xl">{{ $t('blog') }}</span>
    </div>
    <div class="blogs-body">
      <div
        v-for="(item, index) in blogs"
        class="w-full flex flex-col items-start pb-5 py-5 border-b-[1px]"
        :key="index"
      >
        <router-link :to="`/blog-detail/${item.Id}`">
          <span class="font-bold text-xl">
            {{ item.Title }}
          </span>
        </router-link>
        <span class="text-sm my-5">
          {{ item.Date }}
        </span>
        <div class="w-full flex justify-start">
          <img
            class="object-fit"
            :src="item.Thumbnail"
          >
        </div>
        <router-link
          class="my-5"
          :to="`/blog-detail/${item.Id}`"
        >
          <el-button plain>
            {{ $t('read_more') }}
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import fakeBlogs from '@/libraries/fakeData/blogs'
import { IBlog } from '@/model/blog'

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const blogs = ref<Array<IBlog>>(fakeBlogs)
    return {
      blogs
    }
  }
})
</script>
<style lang="scss">
.blogs-body {
  width: 100%;
  padding: 0px 10vw 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
@media only screen and (max-width: 750px) {
  .blogs-body {
    padding: 0px 5vw 25px;
  }
}
</style>
