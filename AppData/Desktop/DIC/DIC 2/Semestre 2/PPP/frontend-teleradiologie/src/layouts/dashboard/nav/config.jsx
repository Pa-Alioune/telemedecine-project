// component
import SvgColor from "../../../components/svg-color";
import { APP_ROUTES } from "../../../utils/url";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: APP_ROUTES.DASHBOARD,
    icon: icon("ic_analytics"),
    authorisation: "ALL",
  },
  {
    title: "patients",
    path: APP_ROUTES.PATIENTS,
    icon: icon("ic_user"),
    authorisation: "ALL",
  },
  {
    title: "DICOM sent",
    path: APP_ROUTES.DICOMS,
    icon: icon("dicom"),
    authorisation: "ALL",
  },
  {
    title: "DICOM receved",
    path: APP_ROUTES.DICOMSRECEVED,
    icon: icon("dicomReceve"),
    authorisation: "radiologue",
  },
  {
    title: "login",
    path: APP_ROUTES.LOGIN,
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
