<script setup lang="ts">
import { Todos } from "../types/todo";
import TodoItemVue from "../components/TodoItem.vue";
type Props = {
  todos: Todos;
  onDelete: (id: string) => void;
  onChange: (params: { id: string; checked: boolean; content: string }) => void;
};
defineProps<Props>();
</script>

<template>
  <ul class="list-group list-group-flush">
    <TodoItemVue
      v-for="todo in todos"
      :key="todo.id"
      :onChange="onChange"
      :onDelete="onDelete"
      :id="todo.id"
      :content="todo.content"
      :checked="todo.checked"
    />
  </ul>
</template>
