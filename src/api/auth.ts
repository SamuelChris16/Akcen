import { client } from '@/src/api/client';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


const TOKEN_KEY = 'my-auth-token';

// TOKEN GETTER SETTER (TO DYNAMICALLY CHANGE BETWEEN WEB AND ANDROID)
const setToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token); // Web Browser Storage
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token); // Phone Secure Storage
  }
};

const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

const deleteToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const authApi = {
  login: async (identifier: string, password: string) => {
    try {
      const response = await client.post<AuthResponse>('/auth/local', {
        identifier,
        password,
      });
      await setToken(response.data.jwt);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // REGISTER
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await client.post<AuthResponse>(`/auth/local/register`, {
        username,
        email,
        password,
      });
      await setToken(response.data.jwt);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    await deleteToken();
  },

  getToken: async () => {
    return await getToken();
  }
};