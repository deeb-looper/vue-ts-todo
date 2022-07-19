<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import LoginFormVue from '../components/LoginForm.vue'
import AlertVue from '../components/Alert.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { loginError, signupSuccess } = storeToRefs(authStore)
let timeout: ReturnType<typeof setTimeout>

const onSubmit = (params: { email: string, password: string }) => {
  clearTimeout(timeout)
  authStore.signin(params)
};

const handleClose = () => {
  authStore.clearLoginReq()
  authStore.clearSignupReq()
};

watch(loginError, (loginError) => {
  if (loginError) {
    timeout = setTimeout(handleClose, 5000)
  }
})

watch(signupSuccess, (signupSuccess) => {
  if (signupSuccess) {
    timeout = setTimeout(handleClose, 5000)
  }
})

onUnmounted(() => {
  handleClose();
  clearTimeout(timeout)
})

</script>

<template>
  <div class="container-login">
    <div class="header-title">
      <span class="h-label">To</span>
      <span class="h-label d">DO!</span>
    </div>
    <LoginFormVue :isLoading="authStore.loginLoading" :onSubmit="onSubmit" />
  </div>
  <AlertVue type="danger" :message="loginError" :open="!!loginError" :onClose="handleClose" />
  <AlertVue type="success" message="Thanks for signing up! You can now login to your account." :open="signupSuccess"
    :onClose="handleClose" />
</template>

<style scoped>
.header-title {
  margin-bottom: 20px;
}

.h-label {
  color: var(--vt-c-white);
  font-weight: bold;
  font-size: 100px;
}

.h-label.d {
  color: var(--vt-c-secondary);

}

.container-login {
  display: flex;
  flex-direction: column;
  background-color: var(--vt-c-base);
  height: 100vh;
  width: 100vw;
  align-items: center;
  padding-top: 100px;
}
</style>