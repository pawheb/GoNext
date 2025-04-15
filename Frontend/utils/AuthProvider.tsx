import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Text } from 'react-native';
import ApiHandler from './ApiHandler';
import LoginScreen from "../screens/LoginScreen";

const api = new ApiHandler();

interface AuthContextType {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.apiCall({ method: 'GET', url: '/user/info' });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const setToken = (token: string) => {
    api.setToken(token);
    setIsAuthenticated(true);
  };

  if (isAuthenticated === null) return <Text>Ładowanie...</Text>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setToken }}>
      {isAuthenticated ? children : <LoginScreen />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;