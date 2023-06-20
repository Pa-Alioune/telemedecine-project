/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const { store, token, clear } = useLocalStorage();
  const login = (authData) => {
    setAuth(authData);
    store(authData);
  };
  const logout = () => {
    clear();
    setAuth({});
  };
  useEffect(() => {
    setAuth(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
