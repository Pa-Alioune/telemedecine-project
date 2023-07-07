/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { APP_ROUTES } from "../utils/url";
import { redirect } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const { store, token, clear, setTokenRefresh, tokenRefresh } =
    useLocalStorage();
  const login = (accessToken, refreshToken) => {
    setAuth(accessToken);
    console.log(accessToken);
    store(accessToken);
    setTokenRefresh(refreshToken);
  };
  const logout = () => {
    clear();
    setAuth(null);
    return redirect(APP_ROUTES.LOGIN);
  };
  useEffect(() => {
    setAuth(token);
  }, [token]);
  return (
    <AuthContext.Provider value={{ auth, login, logout, tokenRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
