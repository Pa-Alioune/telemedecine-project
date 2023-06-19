import axios from "axios";

export const LoginAction =
  (auth, login) =>
  async ({ request }) => {
    console.log("response");
    const formData = await request.formData();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const res = response.data;
      const accessToken = res?.access;
      const refreshToken = res?.refresh;
      login({ user: { accessToken, refreshToken } });
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };
