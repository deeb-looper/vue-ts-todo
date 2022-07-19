import { defineStore } from 'pinia'
import { useStorage, RemovableRef } from '@vueuse/core'

import axiosInstance from '../services/AxiosInstance';
import { Auth, AuthState } from '../types/auth'
import router from '../router';
import { useTodoStore } from './todo';
import axios, { AxiosError } from 'axios';

interface AuthStoreState {
  auth: RemovableRef<Auth>
  loginLoading: boolean
  loginSuccess: boolean
  loginError: string
  signupLoading: boolean
  signupSuccess: boolean
  signupError: string
}

interface AuthStoreGetters {
  token: (state: AuthState) => string
  authenticated: (state: AuthState) => boolean
  name: (state: AuthState) => string
}

interface AuthStoreActions {
  signin: (params: { email: string, password: string }) => void
  signup: (params: { name: string, email: string, password: string, confirmPassword: string }) => void
  logout: () => void
  setAuth: (payload: Auth) => void
  clearLoginReq: () => void
  clearSignupReq: () => void
}

const initialState: Auth = {
  token: '',
  name: '',
  id: '',
  authenticated: false,
  createdAt: null,
  updatedAt: null,
};

const state = (): AuthStoreState => ({
  auth: useStorage('auth', initialState),
  loginLoading: false,
  loginSuccess: false,
  loginError: '',
  signupLoading: false,
  signupSuccess: false,
  signupError: '',
})

const token = (state: AuthState): string => state.auth.token
const authenticated = (state: AuthState): boolean => state.auth.authenticated
const name = (state: AuthState): string => state.auth.name

const getters: AuthStoreGetters = {
  token,
  authenticated,
  name,
}

const signin = async (params: { email: string, password: string }): Promise<void> => {
  const authStore = useAuthStore();
  try {
    authStore.$patch({
      loginLoading: true,
      loginSuccess: false,
      loginError: '',
      signupSuccess: false,
      signupError: '',
    })
    const res = await axiosInstance.post('auth/login', params)
    if (res.status === 200 && res.data) {
      const resData = res.data;
      const authData = {
        token: resData.token,
        name: resData.user.name,
        id: resData.user.id,
        authenticated: true,
        createdAt: resData.user.created_at,
        updatedAt: resData.user.updated_at,
      }
      setAuth(authData)
      router.push('/')
    }
  } catch (error) {
    let errMsg = ''
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {

        const err = error.response.data as { message: string };
        errMsg = err.message;
      }
    }
    authStore.$patch({
      loginLoading: false,
      loginSuccess: false,
      loginError: errMsg
    })
  }
}

const signup = async (params: { name: string, email: string, password: string, confirmPassword: string }): Promise<void> => {
  const authStore = useAuthStore();
  try {
    authStore.$patch({
      signupLoading: true,
      signupSuccess: false,
      signupError: ''
    })
    const res = await axiosInstance.post('auth/register', params)
    if (res.status === 200) {
      authStore.$patch({
        signupLoading: false,
        signupSuccess: true,
        signupError: ''
      })
      router.replace('/signin')
    }
  } catch (error) {
    let errMsg = ''
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const err = error.response.data as { message: string };
        errMsg = err.message === 'Validation Error' ? 'The email has already been taken.' : err.message;
      }
    }
    authStore.$patch({
      signupLoading: false,
      signupSuccess: false,
      signupError: errMsg
    })
  }
}

const logout = async (): Promise<void> => {
  try {
    const authStore = useAuthStore();
    const todoStore = useTodoStore();
    const res = await axiosInstance.post('auth/logout');
    if (res.status === 204) {
      authStore.$patch({
        auth: initialState
      });
      todoStore.$patch({
        todos: [],
        todoLoading: false,
        isAdding: false,
        isAddSuccess: false,
        addError: '',
        isDeleting: false,
        isDeleteSuccess: false,
        deleteError: ''
      });
      router.replace('/signin')
    }
  } catch (error) {
    console.log(error, 'error');
  }
}

const setAuth = (payload: Auth) => {
  const authStore = useAuthStore();
  authStore.$patch({
    auth: payload,
    loginLoading: false,
    loginSuccess: true,
    loginError: ''
  })
};

const clearLoginReq = () => {
  const authStore = useAuthStore();
  authStore.$patch({
    loginError: '',
    loginSuccess: false,
    
  })
};

const clearSignupReq = () => {
  const authStore = useAuthStore();
  authStore.$patch({
    signupSuccess: false,
    signupError: ''
  })
};

const actions: AuthStoreActions = {
  signin,
  signup,
  setAuth,
  logout,
  clearLoginReq,
  clearSignupReq,
};

export const useAuthStore = defineStore({
  id: 'auth',
  state,
  getters: { ...getters },
  actions,
})
