import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { apiClient } from '../lib/api';
import { User } from '../types';
import { AuthContext, AuthProviderProps, RegisterData } from './auth-context';

export function AuthProvider({ children }: AuthProviderProps) {
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
