<template>
  <div class="empty-todo-wrapper">
    <img alt="list img" src="@/assets/list.svg" width="80" height="80" />
    <span>Todo list increases productivity</span>
  </div>
</template>

<style scoped>
.empty-todo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
}

.empty-todo-wrapper span {
  margin-top: 20px;
  color: #787878d9;
}
</style>