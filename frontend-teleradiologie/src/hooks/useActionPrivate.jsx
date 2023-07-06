import { useEffect } from "react";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";
import axios from "../utils/axios";

export default function useActionPrivate() {
  const { auth, login, logout } = useAuth();
  const { tokenRefresh } = useLocalStorage();
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          prevRequest !== undefined &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const response = await axios.post("/token/refresh", {
            refresh: tokenRefresh,
          });
          if (response.status === 200) {
            login(response.data.access, tokenRefresh);
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.access}`;
            return axios(prevRequest);
          }
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, tokenRefresh, login, logout]);
  return axios;
}
