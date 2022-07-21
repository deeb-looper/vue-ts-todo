<script setup lang="ts">
interface Props {
  id: string;
  checked: boolean;
  onChange: (params: { id: string; checked: boolean; content: string }) => void;
  content: string;
  onDelete: (id: string) => void;
}
const props = defineProps<Props>();

const handleDelete = () => {
  props.onDelete(props.id);
};

const handleChange = () => {
  props.onChange({
    id: props.id,
    checked: props.checked,
    content: props.content,
  });
};
</script>

<template>
  <li class="list-group-item">
    <div class="l-g-wrapper">
      <div class="todo-l-w">
        <div class="ck-todo-w">
          <input
            class="form-check-input me-1 ck-todo"
            type="checkbox"
            v-model="checked"
            aria-label="..."
            @change="handleChange"
          />
        </div>
        <span :class="`${checked && 'todo-item-done'}`">
          {{ content }}
        </span>
      </div>
      <button class="btn btn-outline btn-del" @click="handleDelete">
        <img alt="list img" src="@/assets/trash.svg" width="20" height="20" />
      </button>
    </div>
  </li>
</template>

<style scoped>
.l-g-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-item-done {
  text-decoration: line-through;
  color: #939393;
}

.ck-todo-w {
  margin-right: 10px;
}

.ck-todo {
  margin-top: 5px;
}

.todo-l-w {
  display: flex;
  align-items: center;
}

.btn-del {
  padding: 0;
  margin-left: 20px;
}
</style>
