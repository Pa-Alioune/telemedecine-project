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
  },
  {
    title: "patients",
    path: APP_ROUTES.PATIENTS,
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
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
