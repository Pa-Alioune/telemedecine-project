import { redirect } from "react-router-dom";
import { API_ROUTES, API_URL, APP_ROUTES } from "../utils/url";

export const createPatient =
  (axios) =>
  async ({ request }) => {
    const formData = await request.formData();
    try {
      await axios.post(API_URL + API_ROUTES.PATIENTS + "/", formData);
      return redirect(APP_ROUTES.PATIENTS);
    } catch (error) {
      console.log(error);
    }
  };
