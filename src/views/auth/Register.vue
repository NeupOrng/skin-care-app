<template>
  <div class="register my-5 px-5 flex justify-center">
    <div class="w-[500px]">
      <el-form
        ref="ruleFormRef"
        :model="formModel"
        :rules="rules"
        label-position="top"
      >
        <div class="text-2xl font-bold text-black my-5">
          Create Account
        </div>
        <el-form-item
          prop="FullName"
          label="FullName"
        >
          <el-input
            v-model="formModel.FullName"
            placeholder="FullName"
          />
        </el-form-item>
        <el-form-item
          prop="Email"
          label="Email"
        >
          <el-input
            v-model="formModel.Email"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item
          prop="Facebook"
          label="Facebook"
        >
          <el-input
            v-model="formModel.Facebook"
            placeholder="Facebook"
          />
        </el-form-item>
        <el-form-item
          prop="PhoneNumber"
          label="Phone Number"
        >
          <el-input
            v-model="formModel.PhoneNumber"
            placeholder="Phone Number"
            type="number"
          />
        </el-form-item>
        <el-form-item
          prop="Location"
          label="Detail Location"
        >
          <el-input
            v-model="formModel.Location"
            placeholder="Detail Location"
          />
        </el-form-item>
        <el-form-item
          prop="Password"
          label="Password"
        >
          <el-input
            type="password"
            v-model="formModel.Password"
            placeholder="Password"
          />
        </el-form-item>
        <el-form-item
          prop="ConfirmPassword"
          label="Confirm Password"
        >
          <el-input
            type="password"
            v-model="formModel.ConfirmPassword"
            placeholder="Confirm Password"
          />
        </el-form-item>
        <!-- <el-form-item
        label="Maps"
        >

        </el-form-item> -->
        <!-- <div>
          <PlaceSearch
            v-bind:ready="ready"
            placeholder="Enter a location"
            loading="Map is loading"
            v-bind:fallbackProcedure="fallbackProcedure"
            v-bind:zoom="zoom"
            v-bind:geolocation="geolocation"
            v-bind:gps_timeout="3000"
            v-bind:address="address"
            @changed="getMapData"
          >
          </PlaceSearch>
        </div> -->
        <div class="flex flex-col items-center justify-center">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            CREATE
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { FormInstance } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { ISignUpRequest } from '@/model/auth'
import apiService from '@/libraries/apiService'
import {
  notification,
  notificationType
} from '@/libraries/helpers/notificationHelper'
import router from '@/router'
import { useStore } from 'vuex'

/* eslint-disable */
export default defineComponent({
  name: 'RegisterView',
  setup () {
    const ruleFormRef = ref<FormInstance>()
    const isProcessing = ref(false)
    const formModel = reactive({
      Email: '',
      FullName: '',
      Location: '',
      PhoneNumber: '',
      Facebook: '',
      Lat: '',
      Lng: '',
      Password: '',
      ConfirmPassword: ''
    })
    const emailValidator = (rule: any, value: any, callback: any) => {
      if (formModel.Email === '') {
        callback(new Error('Email is required'))
        // eslint-disable-next-line
      } else if (
        !formModel.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        callback(new Error('Email format invalid'))
      } else {
        callback()
      }
    }
    const passwordValidator = (rule: any, value: any, callback: any) => {
      if (formModel.Password === '') {
        callback(new Error('Password is required'))
      } else if (
        formModel.Password.length < 4 ||
        formModel.Password.length > 8
      ) {
        callback(new Error('Password length need to be between 4 to 8'))
      } else {
        callback()
      }
    }
    const confirmPasswordValidator = (rule: any, value: any, callback: any) => {
      if (formModel.Password !== formModel.ConfirmPassword) {
        callback(new Error('Confirm Password is different from Password'))
      } else if (formModel.ConfirmPassword === '') {
        callback(new Error('Confirm Password is required'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      Email: [{ validator: emailValidator, trigger: 'blur' }],
      Password: [{ validator: passwordValidator, tigger: 'blur' }],
      ConfirmPassword: [
        { validator: confirmPasswordValidator, trigger: 'blur' }
      ]
    })
    const { commit } = useStore()
    const onSubmit = async () => {
      isProcessing.value = true
      const request: ISignUpRequest = {
        email: formModel.Email,
        password: formModel.Password,
        fullname: formModel.FullName,
        phone_number: formModel.PhoneNumber,
        location: formModel.Location,
        lat: formModel.Lat,
        lng: formModel.Lng,
        facebook: formModel.Facebook
      }
      const response = await apiService.postSignUp(request)
      console.log(response)
      if (response.status === 'success') {
        commit('setUser', response.data.user)
        commit('setToken', response.data.accessToken)
        notification(notificationType.Success, 'Success')
        router.push('/')
      } else {
        notification(notificationType.Error, 'User is already exist')
      }
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
    const getMapData = (place: any) => {
      console.log(place)
      place = place
    }

    return {
      formModel,
      ruleFormRef,
      rules,
      submitForm,
      isProcessing,
      ready: false,
      fallbackProcedure: 'gps', // gps | geolocation | address | manually
      zoom: 17, // Default Zoom
      geolocation: {
        // If GPS and Find by address fails then, map will be positioned by a default geolocation
        lat: 31.73858,
        lng: -35.98628,
        zoom: 2
      },
      address: {
        query: 'Albania, Tirane', // If GPS fails, Find by address is triggered
        zoom: 10
      },
      manually: {
        address_description: '21 Dhjetori, Tirana, Albania',
        city: 'Tirana',
        country: 'Albania',
        lat: 41.3267905,
        lng: 19.8060475,
        state: 'Tirana County',
        zip_code: '',
        zoom: 17
      },
      place: {}
    }
  }
})
</script>
