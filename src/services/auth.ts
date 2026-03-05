import { api } from './api';


export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}

export const loginUser = async (
  identifier: string, 
  password: string, 
  role: 'student' | 'mentor'
): Promise<AuthResponse | null> => {
  try {
    const response = await api.post<AuthResponse>('/auth/local', {
      identifier,
      password,
      requestedRole: role 
    });

    if (response && response.jwt) {
      localStorage.setItem('jwt', response.jwt);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('userRole', role); 
      
      return response;
    }

    return null;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid credentials"); 
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
};

export const checkIsAuthenticated = (): boolean => {
  return !!localStorage.getItem('jwt');
};

