import axios from 'axios';
import { Platform } from 'react-native';

export const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:1337' : 'http://localhost:1337';

export const client = axios.create({
  baseURL: `${BASE_URL}/api`, //adds /api to requests
  headers: {
    'Content-Type': 'application/json',
  },
});