/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const login = (authData) => {
    setAuth(authData);
    console.log(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
