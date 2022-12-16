<template>
  <div class="login my-5 px-5 flex justify-center">
    <div class="w-[500px]">
      <el-form
        ref="ruleFormRef"
        :model="formModel"
        :rules="rules"
        label-position="top"
      >
        <div class="text-2xl font-bold text-black my-5">
          Login
        </div>
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
          prop="Password"
          label="Password"
        >
          <el-input
            type="password"
            v-model="formModel.Password"
            placeholder="Password"
          />
        </el-form-item>
        <div class="flex flex-col items-center justify-center gap-3">
          <router-link to="/forget-password">
            <span class="text-sm">Forget Password</span>
          </router-link>
          <el-button
            :loading="isProcessing"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            SIGN IN
          </el-button>
          <router-link to="/register">
            <span class="text-sm">Create Account</span>
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { ILoginRequest } from '@/model/auth'
import apiService from '@/libraries/apiService'
import { useStore } from 'vuex'
import { notification, notificationType } from '@/libraries/helpers/notificationHelper'
import router from '@/router'

export default defineComponent({
  name: 'LoginView',
  setup () {
    const ruleFormRef = ref<FormInstance>()
    const isProcessing = ref(false)
    const formModel = reactive({
      Email: '',
      Password: ''
    })
    const emailValidator = (rule: any, value: any, callback: any) => {
      if (formModel.Email === '') {
        callback(new Error('Email is required'))
        // eslint-disable-next-line
      } else if (!formModel.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        callback(new Error('Email format invalid'))
      } else {
        callback()
      }
    }
    const passwordValidator = (rule: any, value: any, callback: any) => {
      if (formModel.Password === '') {
        callback(new Error('Password is required'))
      } else if (formModel.Password.length < 4 || formModel.Password.length > 8) {
        callback(new Error('Password length need to be between 4 to 8'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      Email: [{ validator: emailValidator, trigger: 'blur' }],
      Password: [{ validator: passwordValidator, tigger: 'blur' }]
    })
    const { commit } = useStore()
    const onSubmit = async () => {
      isProcessing.value = true
      const request: ILoginRequest = {
        email: formModel.Email,
        password: formModel.Password
      }
      const response = await apiService.postLogin(request)
      if (response.status === 'success') {
        commit('setUser', response.data.user)
        commit('setToken', response.data.accessToken)
        notification(notificationType.Success, 'Success')
        router.push('/')
      } else {
        notification(notificationType.Error, 'email or password incorrect')
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
    return {
      formModel,
      ruleFormRef,
      rules,
      submitForm,
      isProcessing
    }
  }
})
</script>
