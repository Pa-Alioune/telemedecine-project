import { useEffect } from "react";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";
import axios from "../utils/axios";

const AUTH_HEADER = "Authorization";
const TOKEN_REFRESH_ENDPOINT = "/token/refresh";

export default function useActionPrivate() {
  const { auth, login, logout } = useAuth();
  const { tokenRefresh } = useLocalStorage();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers[AUTH_HEADER]) {
          config.headers[AUTH_HEADER] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          prevRequest !== undefined &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          try {
            const refreshTokenResponse = await axios.post(
              TOKEN_REFRESH_ENDPOINT,
              { refresh: tokenRefresh }
            );
            if (refreshTokenResponse.status === 200) {
              const { access } = refreshTokenResponse.data;
              login(access, tokenRefresh);
              prevRequest.headers[AUTH_HEADER] = `Bearer ${access}`;
              return axios(prevRequest);
            }
          } catch (error) {
            console.error(error);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, tokenRefresh, login, logout]);

  return axios;
}
