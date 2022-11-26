<template>
  <div class="flex items-center justify-between px-5 z-10 bg-white w-full nav-bar">
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
          <router-link :to="navItem.HyperLink" ><span class="nav-item">{{ navItem.Text }}</span></router-link>
        </div>
      </div>
    </div>
    <div class="flex gap-5 mr-5">
      <div><font-awesome-icon class="text-[30px]" icon="magnifying-glass" /></div>
      <div>
        <router-link :to="`${ $store.getters.checkIsAuthenticated ? '/profile' : '/login' }`">
          <font-awesome-icon class="text-[30px]" icon="user" />
        </router-link>
      </div>
      <div class="relative">
        <font-awesome-icon class="text-[30px]" icon="cart-shopping" />
        <sup class="cart-count absolute top-[-5px] right-[-5px]">{{ $store.getters.getCountCartItem }}</sup>
      </div>
    </div>
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
  width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-bar {
  border-bottom: 1px solid  #e8e9eb;
}
</style>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import INavigationData from '@/model/navigation'

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
    return {
      navList
    }
  }
})
</script>
