import { useState, useEffect } from "react";

export default function useLocalStorage() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("access-token");
    return storedToken ? storedToken : null;
  });
  const [tokenRefresh, setTokenRefresh] = useState(() => {
    const storedToken = localStorage.getItem("refresh-token");
    return storedToken ? storedToken : null;
  });
  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("access-token", token);
    }
  }, [token]);
  useEffect(() => {
    if (tokenRefresh !== null) {
      localStorage.setItem("refresh-token", tokenRefresh);
    }
  }, [tokenRefresh]);

  const store = (myToken) => {
    setToken(myToken);
  };
  const clear = () => {
    setToken(null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };
  return { store, token, clear, tokenRefresh, setTokenRefresh };
}
