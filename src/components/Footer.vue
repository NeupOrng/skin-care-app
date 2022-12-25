<template>
  <div class="w-[100vw] bg-[var(--theme-color)] relative mt-auto">
    <div class="footer-top-container ">
      <div
        class="flex flex-col items-start"
        v-for="(content, i) in footerContent"
        :key="i"
      >
        <span class="font-bold content-title mb-3">
          {{ content.Text }}
        </span>
        <ul class="flex flex-col justify-start items-start ">
          <li
            class="text-white hover:text-[#e6e6e6]"
            v-for="(item, j) in content.Contents"
            :key="j"
          >
            <router-link :to="item.HyperLink">
              {{ item.Text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t-[1px] text-white footer-bottom-container">
      <div class="flex gap-5 px-5 mb-5">
        <a
          href="https://www.facebook.com/RRP.Cosmetic"
          target="_blank"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'square-facebook']"
        /></a>
        <a
          target="_blank"
          href="https://www.messenger.com/t/102925792139451/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'facebook-messenger']"
        /></a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCyoDmZvJz_EQnlWxSpDKIHA"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'youtube']"
        /></a>
        <a
          target="_blank"
          href="https://t.me/rrp_cosmetic"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'telegram']"
        /></a>
        <a
          target="_blank"
          href="https://www.tiktok.com/@rrp.cosmetic?_t=8W56vzjeAF7&_r=1"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'tiktok']"
        /></a>
        <a
          target="_blank"
          href="https://www.instagram.com/rrp.cosmetic/"
        ><font-awesome-icon
          class="text-[30px]"
          :icon="['fab', 'instagram']"
        /></a>
        <a
          target="_blank"
          href="https://www.google.com/maps/place/RRP-Cosmetic/@11.5629172,104.9081715,17z/data=!3m1!4b1!4m5!3m4!1s0x3109514513d23fe7:0xe27753f3745cc029!8m2!3d11.5629172!4d104.9081715"
        ><font-awesome-icon
          class="text-[30px]"
          icon="map-location-dot"
        /></a>
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
    padding: 25px 5vw;
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
