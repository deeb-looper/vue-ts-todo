<script setup lang="ts">
import { Teleport } from "vue";
type Props = {
  todo: string;
  onDelete: () => void;
  onCancel: () => void;
  open: boolean;
};

defineProps<Props>();
</script>

<template>
  <Teleport to="body">
    <div class="modal-wrapper fade show" v-if="open">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">
            <p>Are you sure you want to delete this todo?</p>
            <ul class="mb-4">
              <li class="td-del-list">{{ todo }}</li>
            </ul>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-secondary btn-sm me-2"
                @click="onCancel"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="onDelete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="open"></div>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  display: block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.modal-dialog {
  margin: 10rem auto;
}

.td-del-list {
  color: var(--vt-c-black-mute);
  font-weight: bold;
}
</style>
