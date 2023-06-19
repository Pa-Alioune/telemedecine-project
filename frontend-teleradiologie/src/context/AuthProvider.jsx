/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const { store, clear } = useLocalStorage();
  const login = (authData) => {
    setAuth(authData);
    store(authData);
  };
  const logout = () => {
    clear();
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
