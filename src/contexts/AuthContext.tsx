import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => void;
  logout: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData: User = {
      id: "1",
      email,
      fullName: "",
      age: 0,
      bio: "",
      gender: "",
      interestedIn: "",
      city: "",
      phoneNumber: "",
      interests: [],
    };

    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData: User = {
      id: Date.now().toString(),
      email,
      fullName: "",
      age: 0,
      bio: "",
      gender: "",
      interestedIn: "",
      city: "",
      phoneNumber: "",
      interests: [],
    };

    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
