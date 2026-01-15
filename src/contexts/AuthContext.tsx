"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

interface User {
  email: string;
  user_id?: number;
  user_type?: "Fan" | "Creator";
  full_name?: string;
  display_pic?: string;
  age?: number;
  bio?: string;
  gender?: string;
  state?: string;
  city?: string;
  interests?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    password2: string,
    user_type?: "Fan" | "Creator"
  ) => Promise<void>;
  updateProfile: (userData: Partial<User>) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, signin, signup, signout, initializeAuth } = useAuthStore();

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string) => {
    await signin({ email, password });
  };

  const register = async (
    email: string,
    password: string,
    password2: string,
    user_type?: "Fan" | "Creator"
  ) => {
    await signup({ email, password, password2, user_type });
  };

  const updateProfile = (userData: Partial<User>) => {
    console.log("Profile update (to be implemented):", userData);
  };

  const logout = async () => {
    await signout();
  };

  return (
     <AuthContext.Provider
       value={{
         user: user as User | null,
         isAuthenticated,
         login,
         register,
         updateProfile,
         logout,
       }}
     >
       {children}
     </AuthContext.Provider>
   );
};
