<script setup lang="ts">
type Props = {
  type: 'success' | 'danger'
  message: string
  onClose: () => void
  open: boolean
}

defineProps<Props>();
</script>

<template>
  <div v-if="open" :class="`alert alert-${type} alert-td fade show slide-in d-flex justify-content-between`"
    role="alert">
    {{ message }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="onClose"></button>
  </div>
</template>

<style scoped>
.alert-td {
  position: fixed;
  min-width: 500px;
  margin: 30px 40px;
  right: 0;
  top: 0;
  transform: translateX(120%);
  -webkit-transform: translateX(120%);
}

.slide-in {
  animation: slide-in 1s forwards;
  -webkit-animation: slide-in 1s forwards;
}

@keyframes slide-in {
  100% {
    transform: translateX(0%);
  }
}

@-webkit-keyframes slide-in {
  100% {
    -webkit-transform: translateX(0%);
  }
}
</style>