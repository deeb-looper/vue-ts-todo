<script setup lang="ts">
type Props = {
  logout: () => void;
};
defineProps<Props>();
</script>

<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="navbar-brand">
        <span class="h-label">To</span>
        <span class="h-label d">DO!</span>
      </div>
      <div class="d-flex">
        <button class="btn lgt" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--vt-c-base);
}

.h-label {
  font-weight: bold;
  font-size: 30px;
  color: var(--vt-c-white);
}

.h-label.d {
  color: var(--vt-c-secondary);
}

.lgt {
  color: var(--vt-c-white);
  font-weight: 500;
}

.lgt:hover {
  color: var(--vt-c-secondary);
}
</style>
