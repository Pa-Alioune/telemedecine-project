import axios from "../utils/axios";
import { API_ROUTES } from "../utils/url";

export const LoginAction =
  (auth, login) =>
  async ({ request }) => {
    const formData = await request.formData();

    try {
      const response = await axios.post(API_ROUTES.LOGIN, {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const res = response.data;
      const accessToken = res?.access;
      login(accessToken);
    } catch (err) {
      const error = err.response.data.detail;
      return error;
    }
  };
