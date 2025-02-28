import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import {
  login,
  loginResponse,
  register,
  registerResponse,
} from '@ultimate-tic-tac-toe/types';

interface Player {
  id: string;
  name: string;
}

export const useUserStore = defineStore('userstore', {
  state: () =>
    ({
      id: '',
      name: '',
    } as Player),

  getters: {
    isLoggedIn: (state) => !!state.id && !!state.name,
  },
  actions: {
    async login(id: string) {
      const response = await axios.post<
        loginResponse,
        AxiosResponse<loginResponse>,
        login
      >('/login', {
        id,
      });
      this.id = response.data.id;
      this.name = response.data.name;
    },
    async register(name: string) {
      const response = await axios.post<
        registerResponse,
        AxiosResponse<registerResponse>,
        register
      >('/register', {
        name,
      });

      this.id = response.data.id;
      this.name = response.data.name;
      localStorage.setItem('playerId', response.data.id);
    },
  },
});
