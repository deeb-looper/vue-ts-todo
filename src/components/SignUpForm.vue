<script setup lang="ts">
import { reactive, computed, nextTick } from 'vue';
import useValidate from '@vuelidate/core';
import { required, helpers, email, minLength, sameAs } from '@vuelidate/validators';

type Props = {
  onSubmit: (params: { name: string, email: string, password: string, confirmPassword: string }) => void;
  isLoading?: boolean
};

const props = defineProps<Props>();

const initialState = { name: '', email: '', password: '', confirmPassword: '' };

const state = reactive({ ...initialState });

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Name is required', required),
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email,
    },
    password: {
      required: helpers.withMessage('Password is required', required),
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAs: sameAs(state.password)
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
    props.onSubmit(state);
  }
};
</script>

<template>
  <div class="form-wrapper">
    <div class="form-outline mb-1">
      <label class="form-label" for="name">Name</label>
      <input id="name" class="form-control" v-model="state.name" />
      <span class="field-error px-2">
        {{ v$.name.$error && v$.name.$errors[0].$message || '' }}
      </span>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="email">Email</label>
      <input id="email" class="form-control" v-model="state.email" />
      <span class="field-error px-2">
        {{ v$.email.$error && v$.email.$errors[0].$message || '' }}
      </span>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-1">
      <label class="form-label" for="password">Password</label>
      <input type="password" id="password" class="form-control" v-model="state.password" />
      <span class="field-error px-2">
        {{ v$.password.$error && v$.password.$errors[0].$message || '' }}
      </span>
    </div>

    <div class="form-outline mb-1">
      <label class="form-label" for="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" class="form-control" v-model="state.confirmPassword" />
      <span class="field-error px-2">
        {{ v$.confirmPassword.$error && v$.confirmPassword.$errors[0].$message || '' }}
      </span>
    </div>

    <div class="btn-wrapper">
      <button :disabled="isLoading" type="submit" class="btn signup" @click="handleSubmit">
        <div v-if="isLoading" class="spinner-border text-warning spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span v-else>Sign up</span>
      </button>
      <span class="l-or">Already have an account?</span>
      <router-link to="/signin" type="button" class="btn signin">Sign in</router-link>
    </div>
  </div>
</template>

<style scoped>
.field-error {
  color: red;
  font-size: 12px;
}

.form-wrapper {
  background-color: var(--vt-c-white);
  border-radius: 10px;
  padding: 30px 40px;
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.btn {
  margin: 5px 0;
  color: var(--vt-c-white);
  font-weight: bold;
}

.btn:hover {
  color: var(--vt-c-secondary);
}

.btn.signin {
  background-color: var(--vt-c-primary);

}

.btn.signup {
  background-color: var(--vt-c-base);
}

.l-or {
  margin-top: 20px;
  color: var(--vt-c-base);
}
</style>