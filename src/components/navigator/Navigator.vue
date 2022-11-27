<template>
  <div class="desktop-nav flex items-center justify-between px-5 z-10 bg-white w-full">
    <div class="mx-5 my-5 top-0 left-0">
      <router-link to="/">
        <span class="font-bold text-2xl">
          SOKOSKINS
        </span>
      </router-link>
    </div>
    <div class="flex gap-5 max-w-1/2">
      <div class="flex items-center" v-for="(navItem, index) in navList" :key="index">
        <div class="flex items-center" v-if="navItem.hasOwnProperty('Children')">
          <el-dropdown>
            <router-link :to="navItem.HyperLink">
              <span class="nav-item">{{ navItem.Text }}</span>
            </router-link>
            <template #dropdown>
              <div class="max-w-[600px] p-5 flex gap-3">
                <div class="drop-down-list" v-for="(item, i) in navItem.Children" :key="i">
                  <router-link :to="item.HyperLink"><span class="title">{{ item.Text }}</span></router-link>
                  <ul v-if="item.hasOwnProperty('Children')" class="gap-1 flex mt-1 flex-col">
                    <li v-for="(innerItem, j) in item.Children" :key="j">
                      <router-link :to="innerItem.HyperLink">{{ innerItem.Text }}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </el-dropdown>
        </div>
        <div v-else>
          <router-link :to="navItem.HyperLink"><span class="nav-item">{{ navItem.Text }}</span></router-link>
        </div>
      </div>
    </div>
    <div class="flex gap-5 mr-5">
      <div>
        <font-awesome-icon class="text-[30px]" icon="magnifying-glass" />
      </div>
      <div>
        <router-link :to="`${$store.getters.checkIsAuthenticated ? '/profile' : '/login'}`">
          <font-awesome-icon class="text-[30px]" icon="user" />
        </router-link>
      </div>
      <div class="relative">
        <font-awesome-icon class="text-[30px]" icon="cart-shopping" />
        <sup class="cart-count absolute top-[-5px] right-[-5px]">{{ $store.getters.getCountCartItem }}</sup>
      </div>
    </div>
  </div>
  <div class="mobile-nav relative">
    <div class="flex items-center justify-between px-3 z-10 bg-white w-full">
      <div class="my-3">
        <router-link to="/">
          <span class="font-bold text-2xl">
            SOKOSKINS
          </span>
        </router-link>
      </div>
      <div class="flex gap-5">
        <div>
          <font-awesome-icon class="text-[20px]" icon="magnifying-glass" />
        </div>
        <div>
          <router-link :to="`${$store.getters.checkIsAuthenticated ? '/profile' : '/login'}`">
            <font-awesome-icon class="text-[20px]" icon="user" />
          </router-link>
        </div>
        <div class="relative">
          <font-awesome-icon class="text-[20px]" icon="cart-shopping" />
          <sup class="cart-count absolute top-[-7px] right-[-7px]"><span>{{ $store.getters.getCountCartItem
          }}</span></sup>
        </div>
        <div @click="mobileDropDownToggle = !mobileDropDownToggle" class="w-[35px] flex justify-center items-center">
          <font-awesome-icon v-if="mobileDropDownToggle" class="text-[20px]" icon="xmark" />
          <font-awesome-icon v-else class="text-[20px]" icon="bars" />
        </div>
      </div>
    </div>
    <transition>
      <ul v-if="mobileDropDownToggle">
        <li v-if="historyList.length > 0" class="w-[100vw] h-[50px]">
          <div @click="backNavList" class="flex items-center pl-5 border-t-[1px] h-full justify-start">
            <span class="border-r-[1px] h-[50px] flex pr-5 items-center"><font-awesome-icon icon="chevron-left" /></span>
          </div>
        </li>
        <li v-for="(navItem, index) in navListForRender" :key="index" class="w-[100vw] h-[50px]">
          <div
            class="flex items-center pl-5 border-t-[1px] h-full justify-start"
          >
            <router-link :to="navItem.HyperLink" v-if="!navItem.hasOwnProperty('Children')" @click="mobileDropDownToggle = false">{{ navItem.Text }}</router-link>
            <div v-else @click="openNavList(navItem.Children)" class="flex justify-between w-[100vw] pr-5">
              <span class="flex items-center">{{ navItem.Text }}</span>
              <span class="border-l-[1px] h-[50px] flex pl-5 items-center"><font-awesome-icon icon="chevron-right" /></span>
            </div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>
<style lang="scss">
.nav-item {
  font-weight: 700;
  font-size: 24px;
  color: black;
  height: fit-content;
  padding-bottom: 2px;
}

.nav-item:hover {
  padding-bottom: 0px;
  border-bottom: 2px solid black;
}

.drop-down-list {
  color: black;

  .title {
    font-weight: 600;
    font-size: 16px;
    padding-bottom: 3px;
  }

  .title:hover {
    padding-bottom: 2px;
    border-bottom: 1px solid black;
  }

  ul {
    padding-left: 5px;

    li {
      font-size: 14px;
      padding-bottom: 1px;
    }

    li:hover {
      border-bottom: 1px solid black;
      padding-bottom: 0;
    }
  }
}

.cart-count {
  background: #0088cc;
  color: white;
  width: 15px;
  height: 15px;
  padding-top: 2px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.desktop-nav {
  border-bottom: 1px solid #e8e9eb;
}

.mobile-nav {
  display: none;
}

@media only screen and (max-width: 750px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-nav {
    display: block;
    border-bottom: 1px solid #e8e9eb;
  }
}
</style>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import INavigationData from '@/model/navigation'
import _ from 'lodash'

export default defineComponent({
  name: 'NavigatorComponent',
  setup () {
    const navList = ref<Array<INavigationData>>([
      {
        Text: 'New',
        HyperLink: '/products/new'
      },
      {
        Text: 'Best',
        HyperLink: '/products/best'
      },
      {
        Text: 'Routine',
        HyperLink: '',
        Children: [
          {
            Text: 'Triple-Cleanse',
            HyperLink: '/routine/triple-cleanse',
            Children: [
              {
                Text: 'Oil Cleaners',
                HyperLink: '/routine/oil-cleaners'
              },
              {
                Text: 'Water Based Cleaners',
                HyperLink: '/routine/water-based-cleaners'
              },
              {
                Text: 'Cleansing Water',
                HyperLink: '/routine/cleansing water'
              }
            ]
          },
          {
            Text: 'Exfoliators',
            HyperLink: '/routine/exfoliators',
            Children: [
              {
                Text: 'Physical Exfoliators',
                HyperLink: '/routine/physical-exfoliators'
              },
              {
                Text: 'Chemical Exfoliators',
                HyperLink: '/routine/chemical-exfoliators'
              }
            ]
          }
        ]
      },
      {
        Text: 'Blog',
        HyperLink: '/blog'
      }
    ])
    const navListForRender = ref(_.cloneDeep(navList.value))
    const mobileDropDownToggle = ref(false)
    const historyList = ref<Array<Array<INavigationData>>>([])
    watch(mobileDropDownToggle, (newVal) => {
      if (!newVal) {
        navListForRender.value = navList.value
        historyList.value = []
      }
    })
    const openNavList = (navItem: Array<INavigationData>) => {
      historyList.value.push(navListForRender.value)
      navListForRender.value = navItem
    }
    const backNavList = () => {
      if (historyList.value.length < 2) {
        navListForRender.value = navList.value
      } else {
        navListForRender.value = historyList.value[historyList.value.length - 2]
      }
      historyList.value.pop()
    }
    return {
      navList,
      mobileDropDownToggle,
      navListForRender,
      historyList,
      openNavList,
      backNavList
    }
  }
})
</script>
