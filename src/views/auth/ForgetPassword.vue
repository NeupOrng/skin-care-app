<template>
  <div class="login my-5 px-5 flex justify-center">
    <div class="w-[500px]">
      <el-form ref="ruleFormRef" :model="formModel" :rules="rules" label-position="top">
        <div class="text-2xl font-bold text-black my-5">RESET YOUR PASSWORD</div>
        <div class="text-md my-2">We will send you an email to reset your password.</div>
        <el-form-item prop="Email" label="Email">
          <el-input v-model="formModel.Email" placeholder="Email" />
        </el-form-item>
        <div class="flex flex-col items-center justify-center gap-3">
          <el-button type="primary" @click="submitForm(ruleFormRef)">{{ $t('submit') }}</el-button>
          <router-link to="/login"><span class="text-sm">Cancel</span></router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'ForgetPassword',
  setup () {
    const ruleFormRef = ref<FormInstance>()
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
    const rules = reactive({
      Email: [{ validator: emailValidator, trigger: 'blur' }]
    })
    const onSubmit = () => {
      window.alert(`
        login success
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
