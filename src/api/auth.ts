import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.0.2.2:1337/api'; 
const TOKEN_KEY = 'my-auth-token';

// 1. Types for your Auth Payloads
interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const authApi = {
  // LOGIN
  login: async (identifier: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/local`, {
        identifier,
        password,
      });
      // Save token securely immediately
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.jwt);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // REGISTER
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
      });
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.jwt);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  // CHECK SESSION (On App Start)
  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};