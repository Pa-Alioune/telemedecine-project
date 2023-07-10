import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginAction } from "./services/User.jsx";
import { createPatient } from "./services/Patient.jsx";
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
import Patient from "./pages/Patient.jsx";
import useActionPrivate from "./hooks/useActionPrivate.jsx";
import DicomSent from "./pages/Dicom/DicomSent.jsx";
import { OneDicomSent } from "./pages/Dicom/OneDicomSent.jsx";
import DicomReceve from "./pages/Dicom/DicomReceve.jsx";
import { OneDicomReceve } from "./pages/Dicom/OneDicomReceve.jsx";
import DicomLayout from "./layouts/DicomLayout.jsx";
import OnePatient from "./pages/OnePatient.jsx";

function App() {
  const { login } = useAuth(AuthContext);
  const axiosPrivate = useActionPrivate();

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
          <Route element={<DashboardLayout />}>
            <Route path={APP_ROUTES.DASHBOARD} element={<DashboardAppPage />} />
            <Route path={APP_ROUTES.PATIENTS} element={<DicomLayout />}>
              <Route index element={<UserPage />} />
              <Route
                action={createPatient(axiosPrivate)}
                path={APP_ROUTES.PATIENTADD}
                element={<Patient />}
              />
              <Route path=":id" element={<OnePatient />} />
            </Route>
            <Route path={APP_ROUTES.DICOMS}>
              <Route index element={<DicomSent />} />
              <Route path=":id" element={<OneDicomSent />} />
            </Route>
            <Route path={APP_ROUTES.DICOMSRECEVED}>
              <Route index element={<DicomReceve />} />
              <Route path=":id" element={<OneDicomReceve />} />
            </Route>
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
