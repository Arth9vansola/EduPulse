'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'faculty' | 'admin' | null;

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  role: null,
  setRole: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for stored role when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        setRole(storedRole as UserRole);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', selectedRole as string);
    }
  };

  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
    }
  };

  return (
    <UserContext.Provider value={{ role, setRole, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
