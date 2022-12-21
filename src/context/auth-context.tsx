import { User } from "models/user";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
export interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
  { 
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(useCallback(() => {
    bootstrapUser().then(setUser)
  }, []))

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在authprovider中使用");
  }
  return context;
};

