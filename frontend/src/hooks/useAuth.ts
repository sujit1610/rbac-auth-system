import { useState } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const getStoredUser = (): User | null => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = (userData: User) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isLoggedIn = !!user;

  return { user, login, logout, isAdmin, isLoggedIn };
};
