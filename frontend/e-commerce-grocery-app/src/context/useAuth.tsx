import { createContext, useContext,ReactNode } from "react";

// User ka interface (Aap apne backend user object ke mutabiq keys badal sakte hain)
export interface UserType {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Context ke andar jo kuch bhi pass hoga, uski type
export interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: UserType) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
