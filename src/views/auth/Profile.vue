<template>
  <!-- Full-width fluid until the `md` breakpoint, then lock to container -->
  <div class="md:container md:mx-auto">
    <!-- ... -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
      <div>
        <div class="flex flex-col items-center text-center p-3 py-5">
          <img
            class="rounded-full w-32 h-32"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          ><span class="font-bold">{{ formModel.FullName }}</span><span class="text-black-50">{{ formModel.Email }}</span>
        </div>
      </div>
      <!-- ... -->
      <div class="p-3 py-5">
        <div class="flex justify-between items-center mt-5 mb-3">
          <h4 class="text-right text-2xl font-bold">Profile Settings</h4>
        </div>
        <div class="row-auto mt-5">
          <el-form ref="ruleFormRef" :model="formModel" label-position="top">
            <el-form-item prop="FullName" label="FullName">
              <el-input v-model="formModel.FullName" placeholder="FullName" />
            </el-form-item>
            <el-form-item prop="Facebook" label="Facebook">
              <el-input v-model="formModel.Facebook" placeholder="Facebook" />
            </el-form-item>
            <el-form-item prop="PhoneNumber" label="Phone Number">
              <el-input
                v-model="formModel.PhoneNumber"
                placeholder="Phone Number"
                type="text"
              />
            </el-form-item>
            <el-form-item prop="Location" label="Detail Location">
              <el-input
                v-model="formModel.Location"
                placeholder="Detail Location"
              />
            </el-form-item>
            <div class="items-center justify-center">
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Edit
              </el-button>
              <el-button type="danger" @click="$router.back()">
                Cancel
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import apiService from '@/libraries/apiService'
import { FormInstance } from 'element-plus'
import {
  notification,
  notificationType
} from '@/libraries/helpers/notificationHelper'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const formModel = reactive({
      Email: '',
      FullName: '',
      Location: '',
      PhoneNumber: '',
      Facebook: '',
      Lat: '',
      Lng: ''
    })
    const isLoading = ref(false)
    const isProcessing = ref(false)
    const onSubmit = async () => {
      isProcessing.value = true
      notification(notificationType.Success, 'Success')
      // const response = await apiService.postSignUp(request);
      // if (response.status === "success") {
      //   notification(notificationType.Success, "Success");
      // }
      isProcessing.value = false
    }
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          onSubmit()
        }
      })
    }
    const ruleFormRef = ref<FormInstance>()
    const getProfile = async () => {
      isLoading.value = true;
      const profile = await apiService.getProfile()
      // if (profile) {
      formModel.Email = profile['email'];
      formModel.FullName = profile['fullname'];
      formModel.Facebook = profile['facebook'];
      formModel.PhoneNumber = profile['phone_number'];
      formModel.Location = profile['location'];
      formModel.Lat = profile['lat'];
      formModel.Lng = profile['lng'];
      // }
      isLoading.value = false;
    }
    getProfile()
    return {
      formModel,
      ruleFormRef,
      isLoading,
      isProcessing,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
body {
  background: rgb(24, 197, 180);
}
</style>
