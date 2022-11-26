<template>
    <div class="login my-5">
      <el-form :model="formModel">
        <span class="text-2xl font-bold text-black">Login</span>
        <el-form-item prop="Email" label="Email">
          <el-input v-model="formModel.Email" />
        </el-form-item>
        <el-form-item prop="Passwordd" label="Password">
          <el-input type="password" v-model="formModel.Password" />
        </el-form-item>
      </el-form>
    </div>
  </template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'LoginView',
  setup () {
    const formModel = reactive({
      Email: '',
      Password: ''
    })
    return {
      formModel
    }
  }
})
</script>
