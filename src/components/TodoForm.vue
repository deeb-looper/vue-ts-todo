<script setup lang="ts">
import { reactive, computed, nextTick } from 'vue';
import useValidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

type Props = {
  onSubmit: (value: string) => void;
};

const props = defineProps<Props>();

const initialState = { todo: '' };

const state = reactive({ ...initialState });

const rules = computed(() => {
  return {
    todo: {
      required: helpers.withMessage('Field is required', required),
    },
  };
});

const v$ = useValidate(rules, state);

const clearForm = async () => {
  nextTick(() => { v$.value.$reset() });
  Object.assign(state, initialState);
};

const handleSubmit = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    props.onSubmit(state.todo);
    clearForm();
  }
};
</script>

<template>
  <div :class="`input-group ${!v$.$error && 'mb-4'}`">
    <input type="text" class="form-control add-todo-input" placeholder="ADD TODO HERE..." aria-label="user todo"
      aria-describedby="button-addon2" v-model="state.todo">
    <button class="btn btn-add-todo" type="button" id="button-addon2" @click="handleSubmit">
      <span class="btn-add-todo-label">+</span>
    </button>
  </div>
  <span class="field-error mb-2 mt-1 px-3" v-if="v$.todo.$error">
    {{ v$.todo.$errors[0].$message }}
  </span>
</template>

<style scoped>
.field-error {
  color: red;
  font-size: 12px;
}

.add-todo-input {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.btn-add-todo {
  color: var(--vt-c-white);
  background-color: var(--vt-c-primary);
  border: 1px solid var(--vt-c-primary);
  width: 70px;
  border-radius: 50px;
}

.btn-add-todo:hover {
  color: var(--vt-c-white);
  background-color: var(--vt-c-base);
  border: 1px solid var(--vt-c-base);
}

.btn-add-todo-label {
  font-weight: bold;
  font-size: 20px;
}
</style>