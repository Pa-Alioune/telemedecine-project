import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginAction } from "./services/User.jsx";
import { HelmetProvider } from "react-helmet-async";
// routes
// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import useAuth from "./hooks/useAuth.jsx";
import AuthContext from "./context/AuthProvider.jsx";
import { APP_ROUTES } from "./utils/url.js";
import RequireAuth from "./components/RequiredAuth.jsx";
import DashboardLayout from "./layouts/dashboard";
import DashboardAppPage from "./pages/Dashboard/DashboardAppPage";
// import useActionPrivate from "./hooks/useActionPrivate.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Page404 from "./pages/Page404";
import UserPage from "./pages/UserPage.jsx";

function App() {
  const { login } = useAuth(AuthContext);

  // const axiosPrivate = useActionPrivate();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Page404 />}>
        <Route index element={<div>Home</div>} />
        <Route
          path={APP_ROUTES.LOGIN}
          action={LoginAction(login)}
          element={<LoginPage />}
        />
        <Route element={<RequireAuth />}>
          <Route path={APP_ROUTES.DASHBOARD} element={<DashboardLayout />}>
            <Route index element={<DashboardAppPage />} />
            <Route path={APP_ROUTES.USERS} element={<UserPage />} />
          </Route>
        </Route>

        {/* <Route element={<RequireAuth />}>
          <Route
          loader={loadAcount(axiosPrivate, auth, tokenRefresh, logout)}
          path={APP_ROUTES.DASHBOARD}
          element={<Dashboard />}
          /> 
        </Route>*/}
      </Route>
    )
  );
  return (
    <HelmetProvider>
      <ThemeProvider>
        <StyledChart />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
