<script setup lang="ts">
export type Props = {
  label: string;
  onClick: () => void;
};
defineProps<Props>();
</script>

<template>
  <button @click="onClick">{{ label }}</button>
</template>
