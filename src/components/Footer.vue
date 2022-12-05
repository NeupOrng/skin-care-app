<template>
  <div class="w-[100vw] bg-[#0088cc] relative mt-auto">
    <div class="footer-top-container ">
      <div class="flex flex-col items-start" v-for="(content, i) in footerContent" :key="i">
        <span class="font-bold content-title mb-3">
          {{ content.Text }}
        </span>
        <ul class="flex flex-col justify-start items-start ">
          <li class="text-white hover:text-[#e6e6e6]" v-for="(item, j) in content.Contents" :key="j">
            <router-link :to="item.HyperLink" >{{ item.Text }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t-[1px] text-white footer-bottom-container">
      <div class="flex gap-5 px-5 mb-5">
        <a href="facebook.com"><font-awesome-icon class="text-[30px]" :icon="['fab', 'square-facebook']" /></a>
        <a href="facebook.com"><font-awesome-icon class="text-[30px]" :icon="['fab', 'twitter']" /></a>
      </div>
      <span class="text-sm">© 2022, SoKoSkins</span>
    </div>
  </div>
</template>
<style lang="scss">
  .footer-top-container {
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 25px 10vw;
    color: white;
    div {
      margin-right: 10vw;
    }
  }
  .footer-bottom-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 20px 10vw;
  }
  @media only screen and (max-width: 750px) {
  .footer-top-container {
    flex-direction: column;
    padding: 25px 10vw;
    .content-title {
      margin-top: 25px;
    }
  }
  .footer-bottom-container {
    justify-content: center;
    div {
      justify-content: center;
    }
  }
}
</style>
<script lang="ts">
import { it } from 'element-plus/es/locale'
import { defineComponent } from 'vue'

interface IFooterItem {
  Text: string,
  HyperLink: string,
}
interface IFooterContent {
  Text: string,
  Contents: Array<IFooterItem>
}

export default defineComponent({
  name: 'FooterComponent',
  setup () {
    const footerContent: Array<IFooterContent> = [
      {
        Text: 'what_about_us',
        Contents: [
          {
            Text: 'about_us',
            HyperLink: '#'
          },
          {
            Text: 'contact_us',
            HyperLink: '#'
          },
          {
            Text: 'terms_of_service',
            HyperLink: '#'
          }
        ]
      },
      {
        Text: 'customer_care',
        Contents: [
          {
            Text: 'privacy_policy',
            HyperLink: '#'
          },
          {
            Text: 'terms_of_service',
            HyperLink: '#'
          }
        ]
      }
    ]
    return {
      footerContent
    }
  }
})
</script>
