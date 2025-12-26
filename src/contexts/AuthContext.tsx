import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // For demo purposes, we'll use local storage
  // In a production app, this would use JWT tokens and proper auth
  const login = async (email: string, password: string) => {
    // This is a simplified mock implementation
    // In a real app, you would validate credentials against a backend
    
    // For this demo, we'll just check if email is kssinghal@gmail.com
    if (email === 'kssinghal@gmail.com') {
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'Kushagra Singhal',
        phone: '+91 9876543210',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return;
    }
    
    throw new Error('Invalid credentials');
  };

  const signup = async (email: string, password: string, name: string) => {
    // This is a simplified mock implementation
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};