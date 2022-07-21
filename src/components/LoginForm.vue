<script setup lang="ts">
import { reactive, computed /* nextTick */ } from "vue";
import useValidate from "@vuelidate/core";
import { required, helpers, email, minLength } from "@vuelidate/validators";

type Props = {
  onSubmit: (params: { email: string; password: string }) => void;
  isLoading?: boolean;
};

const props = defineProps<Props>();

const initialState = { email: "", password: "" };

const state = reactive({ ...initialState });

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email,
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: minLength(8),
    },
  };
});

const v$ = useValidate(rules, state);

// const clearForm = async () => {
//   nextTick(() => { v$.value.$reset() });
//   Object.assign(state, initialState);
// };

const handleSubmit = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    props.onSubmit(state);
  }
};
</script>

<template>
  <div class="form-wrapper">
    <!-- Email input -->
    <div class="form-outline mb-1">
      <label class="form-label" for="email">Email</label>
      <input id="email" class="form-control" v-model="state.email" />
      <span class="field-error px-2">
        {{ (v$.email.$error && v$.email.$errors[0].$message) || "" }}
      </span>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-2">
      <label class="form-label" for="password">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        v-model="state.password"
      />
      <span class="field-error px-2">
        {{ (v$.password.$error && v$.password.$errors[0].$message) || "" }}
      </span>
    </div>

    <div class="btn-wrapper">
      <button
        :disabled="isLoading"
        type="submit"
        @click="handleSubmit"
        class="btn signin"
      >
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm text-warning"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <span v-else>Sign in</span>
      </button>
      <span class="l-or">or</span>
      <router-link to="/signup" type="button" class="btn signup"
        >Sign up</router-link
      >
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
  text-align: center;
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
  color: var(--vt-c-base);
}
</style>
