<template>
  <div>
    <div
      class="desktop-nav flex h-[60px] items-center mt-auto justify-between px-5 z-10 bg-white w-full"
    >
      <div class="mx-5 my-5 top-0 left-0">
        <router-link to="/">
          <span class="font-bold text-2xl"> SOKOSKINS </span>
        </router-link>
      </div>
      <div class="flex gap-5 max-w-1/2">
        <div
          class="flex items-center"
          v-for="(navItem, index) in navList"
          :key="index"
        >
          <div
            class="flex items-center"
            v-if="navItem.hasOwnProperty('Children')"
          >
            <el-dropdown>
              <router-link :to="navItem.HyperLink">
                <span class="nav-item">{{ navItem.Text }}</span>
              </router-link>
              <template #dropdown>
                <div class="max-w-[600px] p-5 flex gap-3">
                  <div
                    class="drop-down-list"
                    v-for="(item, i) in navItem.Children"
                    :key="i"
                  >
                    <router-link :to="item.HyperLink">
                      <span class="title">{{ item.Text }}</span>
                    </router-link>
                    <ul
                      v-if="item.hasOwnProperty('Children')"
                      class="gap-1 flex mt-1 flex-col"
                    >
                      <li v-for="(innerItem, j) in item.Children" :key="j">
                        <router-link :to="innerItem.HyperLink">
                          {{ innerItem.Text }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </el-dropdown>
          </div>
          <div v-else>
            <router-link :to="navItem.HyperLink">
              <span class="nav-item">{{ navItem.Text }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex h-[30px] items-center gap-5 mr-5">
        <div class="w-[20vw] flex justify-end items-center">
          <el-input class="custom-input" v-model="searchModel" v-if="isSearch">
            <template #append>
              <font-awesome-icon
                @click="onSearchIconClick"
                class="text-[20px] cursor-pointer"
                icon="magnifying-glass"
              />
            </template>
          </el-input>
          <font-awesome-icon
            v-else
            @click="onSearchIconClick"
            class="text-[20px] cursor-pointer"
            icon="magnifying-glass"
          />
        </div>
        <div @click="desktopProfileDropDown = !desktopProfileDropDown">
          <font-awesome-icon
            v-if="desktopProfileDropDown"
            class="text-[20px]"
            icon="user"
          />
          <font-awesome-icon v-else class="text-[20px]" icon="user" />
        </div>
        <div class="relative cursor-pointer">
          <router-link to="/cart">
            <font-awesome-icon class="text-[20px]" icon="cart-shopping" />
            <sup class="cart-count absolute top-[-10px] right-[-10px]">{{
              $store.getters.getCountCartItem
            }}</sup>
          </router-link>
        </div>
      </div>
    </div>
    <transition>
      <ul
        class="bg-white border-b-[1px] shadow-md shadow-black"
        v-if="desktopProfileDropDown"
      >
        <li v-if="historyProfileList.length > 0" class="w-[100vw] h-[50px]">
          <div
            @click="backProfileList"
            class="flex items-center pl-5 border-t-[1px] h-full justify-start"
          >
            <span class="border-r-[1px] h-[50px] flex pr-5 items-center">
              <font-awesome-icon icon="chevron-left" />
            </span>
          </div>
        </li>
        <li
          v-for="(navItem, index) in profileListForRender"
          :key="index"
          class="w-[100vw] h-[50px]"
        >
          <div
            class="flex items-center pl-5 border-t-[1px] h-full justify-start"
          >
            <router-link
              class="w-[100vw] flex flex-col justify-center items-start h-full"
              :to="navItem.HyperLink"
              v-if="!navItem.hasOwnProperty('Children')"
              @click="desktopProfileDropDown = false"
            >
              <span class="my-auto">{{ navItem.Text }}</span>
            </router-link>
            <div
              v-else
              @click="openNavList(navItem.Children)"
              class="flex justify-between w-[100vw] pr-5"
            >
              <span class="flex items-center">{{ navItem.Text }}</span>
              <span class="border-l-[1px] h-[50px] flex pl-5 items-center">
                <font-awesome-icon icon="chevron-right" />
              </span>
            </div>
          </div>
        </li>
        <li class="w-[100vw] h-[50px]">
          <div
            class="flex items-center bg-red pl-5 border-t-[1px] h-full justify-start"
          >
            <el-button text @click="handleClose"> Logout </el-button>
          </div>
        </li>
      </ul>
    </transition>
    <div class="mobile-nav h-[60px] relative z-10">
      <div class="flex items-center justify-between px-3 z-10 bg-white w-full">
        <div class="my-3">
          <router-link to="/">
            <span class="font-bold text-2xl"> SOKOSKINS </span>
          </router-link>
        </div>
        <div class="flex gap-5 items-center">
          <div class="w-[30vw] flex justify-end items-center">
            <el-input
              class="custom-input"
              v-model="searchModel"
              v-if="isSearch"
            >
              <template #append>
                <font-awesome-icon
                  @click="onSearchIconClick"
                  class="text-[20px] cursor-pointer"
                  icon="magnifying-glass"
                />
              </template>
            </el-input>
            <font-awesome-icon
              v-else
              @click="onSearchIconClick"
              class="text-[20px] cursor-pointer"
              icon="magnifying-glass"
            />
          </div>
          <div @click="onProfilecClick">
            <font-awesome-icon
              v-if="mobileProfileDropDown"
              class="text-[20px]"
              icon="user"
            />
            <font-awesome-icon v-else class="text-[20px]" icon="user" />
          </div>
          <!-- <div>
            <router-link :to="`${$store.getters.checkIsAuthenticated ? '/profile' : '/login'}`">
              <font-awesome-icon
                class="text-[20px] cursor-pointer"
                icon="user"
              />
            </router-link>
          </div> -->
          <div class="relative cursor-pointer">
            <router-link to="/cart">
              <font-awesome-icon class="text-[20px]" icon="cart-shopping" />
              <sup class="cart-count absolute top-[-7px] right-[-7px]"
                ><span>{{ $store.getters.getCountCartItem }}</span></sup
              >
            </router-link>
          </div>
          <div
            @click="onHamburgerClick"
            class="w-[35px] flex justify-center items-center cursor-pointer"
          >
            <font-awesome-icon
              v-if="mobileDropDownToggle"
              class="text-[20px]"
              icon="xmark"
            />
            <font-awesome-icon v-else class="text-[20px]" icon="bars" />
          </div>
        </div>
      </div>
      <transition>
        <ul
          class="bg-white border-b-[1px] shadow-md shadow-black"
          v-if="mobileDropDownToggle"
        >
          <li v-if="historyList.length > 0" class="w-[100vw] h-[50px]">
            <div
              @click="backNavList"
              class="flex items-center pl-5 border-t-[1px] h-full justify-start"
            >
              <span class="border-r-[1px] h-[50px] flex pr-5 items-center">
                <font-awesome-icon icon="chevron-left" />
              </span>
            </div>
          </li>
          <li
            v-for="(navItem, index) in navListForRender"
            :key="index"
            class="w-[100vw] h-[50px]"
          >
            <div
              class="flex items-center pl-5 border-t-[1px] h-full justify-start"
            >
              <router-link
                class="w-[100vw] flex flex-col justify-center items-start h-full"
                :to="navItem.HyperLink"
                v-if="!navItem.hasOwnProperty('Children')"
                @click="mobileDropDownToggle = false"
              >
                <span class="my-auto">{{ navItem.Text }}</span>
              </router-link>
              <div
                v-else
                @click="openNavList(navItem.Children)"
                class="flex justify-between w-[100vw] pr-5"
              >
                <span class="flex items-center">{{ navItem.Text }}</span>
                <span class="border-l-[1px] h-[50px] flex pl-5 items-center">
                  <font-awesome-icon icon="chevron-right" />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </transition>
      <transition>
        <ul
          class="bg-white border-b-[1px] shadow-md shadow-black"
          v-if="mobileProfileDropDown"
        >
          <li v-if="historyProfileList.length > 0" class="w-[100vw] h-[50px]">
            <div
              @click="backProfileList"
              class="flex items-center pl-5 border-t-[1px] h-full justify-start"
            >
              <span class="border-r-[1px] h-[50px] flex pr-5 items-center">
                <font-awesome-icon icon="chevron-left" />
              </span>
            </div>
          </li>
          <li
            v-for="(navItem, index) in profileListForRender"
            :key="index"
            class="w-[100vw] h-[50px]"
          >
            <div
              class="flex items-center pl-5 border-t-[1px] h-full justify-start"
            >
              <router-link
                class="w-[100vw] flex flex-col justify-center items-start h-full"
                :to="navItem.HyperLink"
                v-if="!navItem.hasOwnProperty('Children')"
                @click="mobileProfileDropDown = false"
              >
                <span class="my-auto">{{ navItem.Text }}</span>
              </router-link>
              <div
                v-else
                @click="openNavList(navItem.Children)"
                class="flex justify-between w-[100vw] pr-5"
              >
                <span class="flex items-center">{{ navItem.Text }}</span>
                <span class="border-l-[1px] h-[50px] flex pl-5 items-center">
                  <font-awesome-icon icon="chevron-right" />
                </span>
              </div>
            </div>
          </li>
          <li class="w-[100vw] h-[50px]">
            <div
              class="flex items-center bg-red pl-5 border-t-[1px] h-full justify-start"
            >
              <el-button text @click="handleClose"> Logout </el-button>
            </div>
          </li>
        </ul>
      </transition>
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

.custom-input {
  height: 35px;
  border: 1px solid black;
  border-radius: 5px;

  .el-input-group__append {
    background: none;
    box-shadow: none;
    color: black;
    padding: 5px;
  }

  .el-input__wrapper {
    box-shadow: none;
  }

  .el-input__wrapper.is-focus {
    box-shadow: none;
  }

  .el-input__wrapper:hover {
    box-shadow: none;
  }
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
    background-color: white;

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
  padding: 3px;
  font-size: 11pxs;
  height: 20px;
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-button.is-text {
  color: white !important;
  background-color: red !important;
}
.el-message-box {
  transform: translate(0, -150px);
}
.el-message-box__message {
  font-weight: 500;
  font-size: 20px;
}
.el-button > span {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
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
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  notification,
  notificationType,
} from "@/libraries/helpers/notificationHelper";
import router from "@/router";
import INavigationData from "@/model/navigation";
import IProfileData from "@/model/profile";
import _ from "lodash";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  name: "NavigatorComponent",
  setup() {
    const navList = ref<Array<INavigationData>>([
      {
        Text: "New",
        HyperLink: "/products/new",
      },
      {
        Text: "Best",
        HyperLink: "/products/bestSelling",
      },
      // {
      //   Text: 'Routine',
      //   HyperLink: '',
      //   Children: [
      //     {
      //       Text: 'Triple-Cleanse',
      //       HyperLink: '/products/triple-cleanse',
      //       Children: [
      //         {
      //           Text: 'Oil Cleaners',
      //           HyperLink: '/products/oil-cleaners'
      //         },
      //         {
      //           Text: 'Water Based Cleaners',
      //           HyperLink: '/products/water-based-cleaners'
      //         },
      //         {
      //           Text: 'Cleansing Water',
      //           HyperLink: '/products/cleansing water'
      //         }
      //       ]
      //     },
      //     {
      //       Text: 'Exfoliators',
      //       HyperLink: '/products/exfoliators',
      //       Children: [
      //         {
      //           Text: 'Physical Exfoliators',
      //           HyperLink: '/products/physical-exfoliators'
      //         },
      //         {
      //           Text: 'Chemical Exfoliators',
      //           HyperLink: '/products/chemical-exfoliators'
      //         }
      //       ]
      //     }
      //   ]
      // },
      {
        Text: "Blog",
        HyperLink: "/blogs",
      },
    ]);
    const profileList = ref<Array<IProfileData>>([
      {
        Text: "Account Detail",
        HyperLink: "/profile",
      },
      {
        Text: "Order History",
        HyperLink: "#",
      },
    ]);
    const { commit } = useStore();
    const navListForRender = ref(_.cloneDeep(navList.value));
    const profileListForRender = ref(_.cloneDeep(profileList.value));
    const mobileDropDownToggle = ref(false);
    const mobileProfileDropDown = ref(false);
    const desktopProfileDropDown = ref(false);
    const historyList = ref<Array<Array<INavigationData>>>([]);
    const historyProfileList = ref<Array<Array<IProfileData>>>([]);
    const isSearch = ref(false);
    const searchModel = ref("");
    const dialogVisible = ref(false);
    watch(mobileDropDownToggle, (newVal) => {
      
      if (!newVal) {
        navListForRender.value = navList.value;
        historyList.value = [];
      }
    });
    watch(mobileProfileDropDown, (newVal) => {
      
      if (!newVal) {
        profileListForRender.value = profileList.value;
        historyProfileList.value = [];
      }
    });
    watch(desktopProfileDropDown, (newVal) => {
      if (!newVal) {
        profileListForRender.value = profileList.value;
        historyProfileList.value = [];
      }
    });
    const openNavList = (navItem: Array<INavigationData>) => {
      historyList.value.push(navListForRender.value);
      navListForRender.value = navItem;
    };
    const backNavList = () => {
      if (historyList.value.length < 2) {
        navListForRender.value = navList.value;
      } else {
        navListForRender.value =
          historyList.value[historyList.value.length - 2];
      }
      historyList.value.pop();
    };
    const backProfileList = () => {
      if (historyProfileList.value.length < 2) {
        profileListForRender.value = profileList.value;
      } else {
        profileListForRender.value =
          historyProfileList.value[historyProfileList.value.length - 2];
      }
      historyProfileList.value.pop();
    };
    const onSearchIconClick = () => {
      isSearch.value = !isSearch.value;
    };
    watch(isSearch, () => {
      searchModel.value = "";
    });
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm("Do you wish to log out?")
        .then(() => {
          commit("removeToken");
          notification(notificationType.Success, "Logout");
          desktopProfileDropDown.value = false;
          mobileProfileDropDown.value = false;
          router.push("/login");
        })
        .catch(() => {
          console.log("error");
        });
    };
    const onProfilecClick = () => {
      if (mobileDropDownToggle.value) {
        mobileDropDownToggle.value = false;
      }
      mobileProfileDropDown.value = !mobileProfileDropDown.value;
    };
    const onHamburgerClick = () => {
      if (mobileProfileDropDown.value) {
        mobileProfileDropDown.value = false;
      }
      mobileDropDownToggle.value = !mobileDropDownToggle.value;
    };

    return {
      navList,
      profileList,
      mobileDropDownToggle,
      mobileProfileDropDown,
      desktopProfileDropDown,
      navListForRender,
      profileListForRender,
      historyList,
      historyProfileList,
      openNavList,
      backNavList,
      backProfileList,
      isSearch,
      onSearchIconClick,
      searchModel,
      handleClose,
      dialogVisible,
      onProfilecClick,
      onHamburgerClick
    };
  },
});
</script>
