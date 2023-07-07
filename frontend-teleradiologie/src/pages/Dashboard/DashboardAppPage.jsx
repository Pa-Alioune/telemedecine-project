import { Helmet } from "react-helmet-async";
// import { faker } from "@faker-js/faker";
// @mui
// import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import useConnected from "../../hooks/useConnected";
// components
// import Iconify from "../../components/iconify";
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from "../../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const user = useConnected();
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bonjour, Bienvenu {user?.name}
        </Typography>
      </Container>
    </>
  );
}
