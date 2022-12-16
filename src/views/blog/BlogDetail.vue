<template>
  <div class="blog-detail" v-loading="isLoading">
    <div class="w-full flex flex-col items-center justify-center py-[25px]">
      <span class="font-bold text-2xl">{{ blog?.title }}</span>
      <span class="text-sm my-5">
        {{ blog?.updated_at }}
      </span>
    </div>
    <div class="w-full relative py-5">
      <img
        class="object-fit"
        :src="blog?.blog_image[0].image_path_for_display"
      >
    </div>
    <div
      class="text-left pb-5"
      v-html="blog?.description"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IBlog } from '@/model/blog'
import { useRoute } from 'vue-router'
import apiService from '@/libraries/apiService'
import { ImageDto } from '@/model/image'

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const blog = ref<IBlog>()
    const { params } = useRoute()
    const isLoading = ref(false)
    const getBlogById = async () => {
      isLoading.value = true
      blog.value = await apiService.getBlogById(String(params.id))
      console.log(blog.value)
      isLoading.value = false
    }
    const onImageLoad = (image: ImageDto) => {
      image.is_loading = false
    }
    getBlogById()
    return {
      blog,
      isLoading,
      onImageLoad
    }
  }
})
</script>
<style lang="scss">
  .blog-detail {
    width: 100vw;
    padding: 0px 10vw 25px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  @media only screen and (max-width: 750px) {
    .blog-detail {
      padding: 0px 5vw 25px;
    }
  }
</style>
