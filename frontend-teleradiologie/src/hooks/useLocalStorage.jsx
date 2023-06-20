import { useState, useEffect } from "react";

export default function useLocalStorage() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });
  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const store = (myToken) => {
    setToken(myToken);
  };
  const clear = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return { store, token, clear };
}
