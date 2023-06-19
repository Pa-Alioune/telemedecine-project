import { Alert } from "@mui/material";
import { Form, useActionData } from "react-router-dom";
import { APP_ROUTES } from "../../utils/url";
export default function Login() {
  const errors = useActionData();
  return (
    <main className="container form-signin w-100 m-auto">
      <Form method="POST" action={APP_ROUTES.LOGIN}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {errors && (
          <Alert className="mb-2" severity="error">
            {errors.message}{" "}
          </Alert>
        )}

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="email"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </Form>
    </main>
  );
}
