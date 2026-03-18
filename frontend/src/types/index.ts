export type Role = 'USER' | 'ADMIN';

export interface AuthResponse {
  token: string;
  role: Role;
  name: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  role: Role;
  token: string;
}
