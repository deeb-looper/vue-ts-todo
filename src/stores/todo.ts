import { defineStore } from "pinia";
import { useStorage, RemovableRef } from "@vueuse/core";
import { Todo, Todos } from "../types/todo";
import axiosInstance from "../services/AxiosInstance";
import router from "../router";

interface TodoStoreState {
  todos: RemovableRef<Todos>;
  todoLoading: boolean;
  isAdding: boolean;
  isAddSuccess: boolean;
  addError: string;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  deleteError: string;
}

interface TodoStoreGetters {
  todosCount: (state: { todos: Todo[] }) => number;
}

interface TodoStoreActions {
  addTodo: (content: string) => void;
  deleteTodo: (id: string) => void;
  updateTodos: (params: {
    id: string;
    checked: boolean;
    content: string;
  }) => void;
  getTodos: () => void;
}

interface TodoRes {
  id: number;
  content: string;
  checked: number;
}

const todoInitialState: TodoStoreState = {
  todos: useStorage("todos", [] as Todos),
  todoLoading: false,
  isAdding: false,
  isAddSuccess: false,
  addError: "",
  isDeleting: false,
  isDeleteSuccess: false,
  deleteError: "",
};

const todoState = (): TodoStoreState => todoInitialState;

const todosCount = (state: { todos: Todo[] }): number => state.todos.length;

const getTodos = async (): Promise<void> => {
  try {
    const todoStore = useTodoStore();
    todoStore.$patch({
      todoLoading: true,
    });
    const res = await axiosInstance.get("todo");
    if (res.status === 200) {
      const data = res.data.data;
      const todoItems = data.map((item: TodoRes) => ({
        content: item.content,
        id: String(item.id),
        checked: !(item.checked === 0),
      }));
      todoStore.$patch({
        todos: todoItems,
        todoLoading: false,
      });
      router.replace("/signin");
    }
  } catch (error) {
    console.log(error);
  }
};

const addTodo = async (content: string): Promise<void> => {
  const todoStore = useTodoStore();

  try {
    const params = {
      content: content,
      checked: false,
    };
    todoStore.$patch({
      isAdding: true,
      addError: "",
      isAddSuccess: false,
    });
    const res = await axiosInstance.post("todo", params);
    if (res.status === 201) {
      const data = res.data.data;
      const newTodo = { content, checked: false, id: String(data.id) };
      todoStore.$patch(
        (state: {
          todos: Todo[];
          isAdding: boolean;
          isAddSuccess: boolean;
        }) => {
          state.todos.push(newTodo);
          state.isAdding = false;
          state.isAddSuccess = true;
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todoStore = useTodoStore();
    todoStore.$patch({
      isDeleting: true,
      isDeleteSuccess: false,
      deleteError: "",
    });
    const res = await axiosInstance.delete(`todo/${id}`);
    if (res.status === 204) {
      todoStore.$patch(
        (state: {
          todos: Todo[];
          isDeleting: boolean;
          isDeleteSuccess: boolean;
        }) => {
          const index = state.todos.findIndex((item) => item.id === id);
          if (index === -1) return;
          state.todos.splice(index, 1);
          state.isDeleting = false;
          state.isDeleteSuccess = true;
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  const todoStore = useTodoStore();
  todoStore.$patch((state: { todos: Todo[] }) => {
    const index = state.todos.findIndex((item) => item.id === id);
    if (index === -1) return;
    state.todos.splice(index, 1);
  });
};

const updateTodos = async (params: {
  id: string;
  checked: boolean;
  content: string;
}): Promise<void> => {
  try {
    const todoStore = useTodoStore();
    const { id, checked, content } = params;
    const res = await axiosInstance.put(`todo/${id}`, { checked, content });
    if (res.status === 200) {
      todoStore.$patch((state: { todos: Todo[] }) => {
        const index = state.todos.findIndex((item) => item.id === id);
        if (index === -1) return;
        state.todos[index] = { ...state.todos[index], checked };
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getters: TodoStoreGetters = {
  todosCount,
};

const actions: TodoStoreActions = {
  addTodo,
  deleteTodo,
  updateTodos,
  getTodos,
};

export const useTodoStore = defineStore({
  id: "todos",
  state: todoState,
  getters: { ...getters },
  actions,
});
