<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import SignUpFormVue from '../components/SignUpForm.vue'
import AlertVue from '../components/Alert.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { signupError, signupLoading } = storeToRefs(authStore)
let timeout: ReturnType<typeof setTimeout>

const onSubmit = (params: { name: string, email: string, password: string, confirmPassword: string }) => {
  clearTimeout(timeout)
  authStore.signup(params)
}

const handleClose = () => {
  authStore.clearSignupReq()
};

watch(signupError, (signupError) => {
  if (signupError) {
    timeout = setTimeout(handleClose, 5000)
  }
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <div class="container-login">
    <div class="h-wrapper">
      <span class="h-c">Create your first</span>
      <div class="header-title">
        <span class="h-label">To</span>
        <span class="h-label d">DO!</span>
      </div>
      <span class="h-a">account</span>
    </div>
    <SignUpFormVue :onSubmit="onSubmit" :isLoading="signupLoading" />
  </div>
  <AlertVue type="danger" :message="signupError" :open="!!signupError" :onClose="handleClose" />
</template>

<style scoped>
.h-wrapper {
  margin-bottom: 20px;
  margin-right: 100px;
}

.h-c {
  color: var(--vt-c-secondary);
  font-weight: bold;
  font-size: 35px;
}

.h-a {
  color: var(--vt-c-white);
  font-weight: bold;
  font-size: 40px;
}

.header-title {
  line-height: 1;
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
  padding-top: 50px;
}
</style>