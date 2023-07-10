import { useState } from "react";
import { Form, Navigate, useActionData, useLocation } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Button,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { APP_ROUTES } from "../../../utils/url";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const errors = useActionData();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const from = location?.state?.from?.pathname || APP_ROUTES.DASHBOARD;
  const { auth } = useAuth();
  if (auth) {
    return <Navigate to={APP_ROUTES.DASHBOARD} />;
  }

  return (
    <>
      {errors && (
        <Alert className="my-3" severity="error">
          {errors.message}{" "}
        </Alert>
      )}
      <Form method="POST" action={APP_ROUTES.LOGIN}>
        <Stack spacing={3}>
          {errors && errors.username ? (
            <TextField
              fullWidth
              id="username"
              label="Login"
              name="username"
              required
              error
              helperText={errors.username}
              autoComplete="username"
            />
          ) : (
            <TextField
              fullWidth
              id="username"
              required
              label="Login"
              name="username"
              autoComplete="username"
            />
          )}
          {errors && errors.password ? (
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              error
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
        <input
          type="text"
          hidden
          name="path"
          onChange={() => {}}
          value={from}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </Button>
      </Form>
    </>
  );
}
