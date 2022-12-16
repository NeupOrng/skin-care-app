<template>
  <!-- eslint-disable -->
  <div class="blogs-page w-[100vw]" v-loading="isLoading">
    <div class="w-full flex items-center justify-center py-[25px] border-b-[1px]">
      <span class="font-bold text-2xl">{{ $t('blog') }}</span>
    </div>
    <div class="blogs-body">
      <div
        v-for="(item, index) in blogsForDisplay"
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
        <div class="w-full flex flex-row items-start relative">
          <img
            class="object-fit"
            :src="item.blog_image[0].image_path_for_display"
          >
          <!-- <div
            v-if="item.blog_image[0].is_laoding"
            :class="`absolute w-full aspect-square top-0 left-0 bg-blue-50 transition duration-300 ease-out ${item.blog_image[0].is_loading ? '' : 'opacity-0'}`"
          /> -->
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
      <el-pagination
        v-if="!isLoading"
        small
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        :total="blogs.length"
        hide-on-single-page
        :page-size="3"
        />
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue'
import { IBlog } from '@/model/blog'
import apiService from '@/libraries/apiService'
import { ImageDto } from '@/model/image'

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const blogs = ref<Array<IBlog>>([])
    const currentPage = ref(1)
    const isLoading = ref(false)
    const getAllBlog = async () => {
      isLoading.value = true
      blogs.value = await apiService.getAllBlogs()
      console.log(blogs.value)
      isLoading.value = false
    }
    const blogsForDisplay = computed(() => {
      return blogs.value.slice(currentPage.value - 1, currentPage.value + 2)
    })
    getAllBlog()
    const onImageLoad = (image: ImageDto) => {
      image.is_loading = false
      console.log(image)
    }
    return {
      blogs,
      isLoading,
      onImageLoad,
      currentPage,
      blogsForDisplay
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
