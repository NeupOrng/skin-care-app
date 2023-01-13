<template>
  <!-- Full-width fluid until the `md` breakpoint, then lock to container -->
  <div class="md:container md:mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white mt-3">
      <div class="p-3">
        <div class="flex flex-col items-start p-3">
          <div class="text-right text-2xl font-bold">Order Detail</div>
          <div class="text-right text-base">
            Review and manage recent orders
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 bg-white">
      <div class="p-3">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div class="pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="p-4">no</th>
                <th scope="col" class="py-3 px-6">Product name</th>
                <th scope="col" class="py-3 px-6 overflow-y-auto">Order on</th>
                <th scope="col" class="py-3 px-6">Qauntity</th>
                <th scope="col" class="py-3 px-6">Price</th>
                <th scope="col" class="py-3 px-6">Status</th>
                <!-- <th scope="col" class="py-3 px-6">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sell, index) in orders"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="p-4 w-4">
                  <div class="flex items-center">{{ index + 1 }}</div>
                </td>
                <td
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ sell.id }}
                </td>
                <td class="py-4 px-6">{{ sell.created_at }}</td>
                <td class="py-4 px-6">{{ sell.description }}</td>
                <td class="py-4 px-6">{{ sell.total }}</td>
                <td class="py-4 px-6">{{ sell.description }}</td>
                <!-- <td class="py-4 px-6">
                  <a
                    href="#"
                    class="text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-500 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-500 dark:hover:bg-emerald-500 focus:outline-none dark:focus:ring-emerald-500"
                    >View</a
                  >
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import apiService from "@/libraries/apiService";
import { FormInstance } from "element-plus";
import {
  notification,
  notificationType,
} from "@/libraries/helpers/notificationHelper";
import { Order } from "@/model/order";

export default defineComponent({
  name: "HistoryPage",
  setup() {
    const isLoading = ref(false);
    const orders = ref<Array<Order>>([]);
    const isProcessing = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const getOrder = async () => {
      isLoading.value = true;
      orders.value = await apiService.getOrder();
      orders.value = orders.value[0]["sell"]
      isLoading.value = false;
    };
    getOrder();
    return {
      orders,
      ruleFormRef,
      isLoading,
      isProcessing,
    };
  },
});
</script>

<style lang="scss" scoped>
body {
  background: rgb(24, 197, 180);
}
</style>
