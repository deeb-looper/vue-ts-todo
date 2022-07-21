<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "../stores/todo";
import { useAuthStore } from "../stores/auth";
import Header from "../components/Header.vue";
import TodoFormVue from "../components/TodoForm.vue";
import EmptyTodoVue from "../components/EmptyTodo.vue";
import TodoListVue from "../components/TodoList.vue";
import LoadingVue from "../components/Loading.vue";
import DeleteTodoModalVue from "../components/DeleteTodoModal.vue";

const todoStore = useTodoStore();
const authStore = useAuthStore();
const {
  todos,
  todoLoading,
  // isAddSuccess,
  // isAdding,
  // isDeleting,
  // isDeleteSuccess,
} = storeToRefs(todoStore);
const { addTodo, deleteTodo, updateTodos, getTodos } = todoStore;
const { name } = storeToRefs(authStore);
const { logout } = authStore;
const selectedTodoId = ref("");
const selectedTodo = computed(() => {
  return (
    todos.value.find((item) => item.id === selectedTodoId.value)?.content || ""
  );
});

todoStore.$subscribe((_, state) => {
  if (state.isDeleteSuccess) {
    selectedTodoId.value = "";
  }
});

onMounted(() => {
  getTodos();
});

const handleDelete = (id: string) => (selectedTodoId.value = id);

const handleModalDelete = () => {
  deleteTodo(selectedTodoId.value);
};

const handleModalCancel = () => (selectedTodoId.value = "");
</script>

<template>
  <div class="home-wrapper">
    <Header :logout="logout" />
    <div class="body-wrapper">
      <div class="todo-wrapper">
        <span class="g-label"
          >What's up, <span class="g-name">{{ name }}!</span></span
        >
        <TodoFormVue :onSubmit="addTodo" />
        <LoadingVue v-if="todoLoading && todos.length < 1" />
        <EmptyTodoVue v-if="!todoLoading && todos.length < 1" />
        <div v-else>
          <TodoListVue
            :onChange="updateTodos"
            :onDelete="handleDelete"
            :todos="todos"
          />
        </div>
      </div>
    </div>
  </div>
  <DeleteTodoModalVue
    :open="!!selectedTodoId"
    :onDelete="handleModalDelete"
    :onCancel="handleModalCancel"
    :todo="selectedTodo"
  />
</template>

<style scoped>
.g-label {
  color: var(--vt-c-primary);
  font-weight: bold;
  font-size: 35px;
  margin: 20px 0;
}

.g-name {
  color: var(--vt-c-secondary);
}

.body-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
}

.todo-wrapper {
  display: flex;
  flex-direction: column;
  width: 500px;
}
</style>
