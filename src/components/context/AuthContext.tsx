"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import users from "@/data/users";

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async (username: string) => {
      const user = users.find((user) => user.username === username);
      setUser(user);
    };

    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded = jwt.decode(token);
      decoded?.username && getUser(decoded.username);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        Cookies.set("token", response.data.token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
        setUser(response.data);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
