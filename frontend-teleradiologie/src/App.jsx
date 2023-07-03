import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login.jsx";
import { LoginAction } from "./services/User.jsx";

import useAuth from "./hooks/useAuth.jsx";
import AuthContext from "./context/AuthProvider.jsx";
import { APP_ROUTES } from "./utils/url.js";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import RequireAuth from "./components/RequiredAuth.jsx";

function App() {
  const { login } = useAuth(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<h1>Not found</h1>}>
        <Route index element={<div>Home</div>} />
        <Route
          path={APP_ROUTES.LOGIN}
          action={LoginAction(login)}
          element={<Login />}
        />
        <Route element={<RequireAuth />}>
          <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
