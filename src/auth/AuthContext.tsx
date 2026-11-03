import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { isTokenExpired } from "../utils/jwt";

import { authService } from "../services/authService";
import type { LoginRequest, LoginResponse } from "./authTypes";
import { registerUnauthorizedHandler } from "../services/api";

interface AuthContextValue {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const logout = useCallback((): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
  
    setUser(null);
  }, []);
  

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const token = localStorage.getItem("token");
  
    if (storedUser && token && !isTokenExpired(token)) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("authUser");
        localStorage.removeItem("token");
      }
    } else {
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
    }
  
    setLoading(false);
  }, []);

  useEffect(() => {
    return registerUnauthorizedHandler(logout);
  }, [logout]);

  async function login(request: LoginRequest): Promise<void> {
    const response = await authService.login(request);

    localStorage.setItem("token", response.token);
    localStorage.setItem("authUser", JSON.stringify(response));

    setUser(response);
  }



  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
