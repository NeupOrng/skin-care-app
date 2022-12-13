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
        <router-link :to="`/blog-detail/${item.id}`">
          <span class="font-bold text-xl">
            {{ item.title }}
          </span>
        </router-link>
        <span class="text-sm my-5">
          {{ item.updated_at }}
        </span>
        <div class="w-full flex justify-start">
          <img
            class="object-fit"
            :src="item.blog_image[0].image_path_for_display"
          >
        </div>
        <router-link
          class="my-5"
          :to="`/blog-detail/${item.id}`"
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
import { IBlog } from '@/model/blog'
import apiService from '@/libraries/apiService'

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const blogs = ref<Array<IBlog>>([])
    const getAllBlog = async () => {
      blogs.value = await apiService.getAllBlogs()
    }
    getAllBlog()
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
