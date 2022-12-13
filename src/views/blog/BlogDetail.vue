<template>
  <div class="blog-detail">
    <div class="w-full flex flex-col items-center justify-center py-[25px]">
      <span class="font-bold text-2xl">{{ blog.Title }}</span>
      <span class="text-sm my-5">
        {{ blog.Date }}
      </span>
    </div>
    <div
      class="text-left pb-5"
      v-html="blog.Content"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// import fakeBlogs from '@/libraries/fakeData/blogs'
import { IBlog } from '@/model/blog'

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const blog = ref<IBlog>()
    return {
      blog
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
