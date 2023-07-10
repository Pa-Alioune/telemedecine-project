import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useActionData, Form, useLocation, Navigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/url";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const errors = useActionData();
  const location = useLocation();
  const from = location?.state?.from?.pathname || APP_ROUTES.DASHBOARD;
  const { auth } = useAuth();
  if (auth) {
    return <Navigate to={APP_ROUTES.DASHBOARD} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form method="POST" action={APP_ROUTES.LOGIN}>
          {errors && (
            <Alert className="my-3" severity="error">
              {errors.message}{" "}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {errors && errors.userName ? (
                <TextField
                  fullWidth
                  id="username"
                  label="login"
                  name="username"
                  required
                  error
                  autoComplete="username"
                  helperText={errors.userName}
                />
              ) : (
                <TextField
                  fullWidth
                  id="username"
                  required
                  label="login"
                  name="username"
                  autoComplete="username"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {errors && errors.password ? (
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  required
                  autoComplete="new-password"
                  error
                  helperText={errors.password}
                />
              ) : (
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  required
                />
              )}
            </Grid>
          </Grid>
          <input
            type="text"
            hidden
            name="path"
            onChange={() => {}}
            value={from}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
        </Form>
      </Box>
    </Container>
  );
}
