<template>
    <div class="register my-5 px-5 flex justify-center">
    <div class="w-[500px]">
      <el-form ref="ruleFormRef" :model="formModel" :rules="rules" label-position="top">
        <div class="text-2xl font-bold text-black my-5">Login</div>
        <el-form-item prop="FirstName" label="First Name">
          <el-input v-model="formModel.FirstName" placeholder="First Name" />
        </el-form-item>
        <el-form-item prop="LastName" label="Last Name">
          <el-input v-model="formModel.LastName" placeholder="Last Name" />
        </el-form-item>
        <el-form-item prop="Email" label="Email">
          <el-input v-model="formModel.Email" placeholder="Email" />
        </el-form-item>
        <el-form-item prop="SkinType" label="Your Current Skin Type">
          <el-input v-model="formModel.SkinType" placeholder="Skin Type" />
        </el-form-item>
        <el-form-item prop="SkinConcern" label="Your Current Skin Concern(s)">
          <el-input v-model="formModel.SKinConcern" placeholder="Skin Concern" />
        </el-form-item>
        <el-form-item prop="Password" label="Password">
          <el-input type="password" v-model="formModel.Password" placeholder="Password" />
        </el-form-item>
        <el-form-item prop="ConfirmPassword" label="Confirm Password">
          <el-input type="password" v-model="formModel.ConfirmPassword" placeholder="Confirm Password" />
        </el-form-item>
        <div class="flex flex-col items-center justify-center">
          <el-button type="primary" @click="submitForm(ruleFormRef)">CREATE</el-button>
        </div>
      </el-form>
    </div>
  </div>
  </template>

<script lang="ts">
import { FormInstance } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'RegisterView',
  setup () {
    const ruleFormRef = ref<FormInstance>()
    const formModel = reactive({
      Email: '',
      FirstName: '',
      LastName: '',
      SkinType: '',
      SKinConcern: '',
      Password: '',
      ConfirmPassword: ''
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
      ConfirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }]
    })
    const onSubmit = () => {
      window.alert(`
        create account success
        ${formModel.Email}
        ${formModel.Password}
      `)
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
      submitForm
    }
  }
})
</script>
