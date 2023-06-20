import { redirect } from "react-router-dom";
import axios from "../utils/axios";
import { API_ROUTES } from "../utils/url";
import { isValidEmail } from "../utils/validate";

export const LoginAction =
  (login) =>
  async ({ request }) => {
    const formData = await request.formData();
    let errors = {};
    let password = formData.get("password");
    let email = formData.get("email");
    let path = formData.get("path");
    if (!password.trim()) {
      errors.password = "Mot de passe requis!";
    }
    if (!email.trim()) {
      errors.email = "L'email est requis";
    } else if (!isValidEmail(email)) {
      errors.email = "L'email que vous avez renseignez est invalid";
    }
    if (Object.entries(errors).length) {
      errors.message = "Le formulaire est mal remplit";
      console.log("errors");
      return errors;
    }

    try {
      const response = await axios.post(API_ROUTES.LOGIN, formData);
      const res = response.data;
      const accessToken = res?.access;
      login(accessToken);
      return redirect(path);
    } catch (err) {
      errors.message = err.response.data.detail;
      return errors;
    }
  };
