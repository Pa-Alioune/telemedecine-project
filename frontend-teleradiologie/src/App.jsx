import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Dashboard/Dashboard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login.jsx";
import { LoginAction } from "./services/User.jsx";

import useAuth from "./hooks/useAuth.jsx";
import AuthContext from "./context/AuthProvider.jsx";
import { APP_ROUTES } from "./utils/url.js";

function App() {
  const { auth, login } = useAuth(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<h1>Not found</h1>}>
        <Route index element={<Home />} />
        <Route
          path={APP_ROUTES.LOGIN}
          action={LoginAction(auth, login)}
          element={<Login />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
