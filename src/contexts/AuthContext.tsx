import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { apiClient } from '../lib/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login: storeLogin, 
    logout: storeLogout, 
    updateUser,
    setLoading 
  } = useAuthStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiClient.login(email, password);
      
      if (response.success) {
        storeLogin(response.data.user, response.data.token);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const response = await apiClient.register(userData);
      
      if (response.success) {
        storeLogin(response.data.user, response.data.token);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    storeLogout();
  };

  const updateProfile = async (updates: Partial<User>) => {
    const response = await apiClient.updateProfile(updates);
    
    if (response.success) {
      updateUser(response.data);
    } else {
      throw new Error('Profile update failed');
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const response = await apiClient.changePassword(currentPassword, newPassword);
    
    if (!response.success) {
      throw new Error('Password change failed');
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const authState = useAuthStore.getState();

      if (authState.isAuthenticated && authState.user) {
        try {
          const response = await apiClient.getCurrentUser();
          if (!isMounted) return;

          if (response.success) {
            authState.updateUser(response.data);
          } else {
            apiClient.logout();
            authState.logout();
          }
        } catch (error) {
          if (!isMounted) return;

          console.error('Auth check failed:', error);
          apiClient.logout();
          authState.logout();
        }
      }

      if (isMounted) {
        useAuthStore.getState().setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
