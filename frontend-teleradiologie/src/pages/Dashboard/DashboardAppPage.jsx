import { Helmet } from "react-helmet-async";
// import { faker } from "@faker-js/faker";
// @mui
// import { useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  Autocomplete,
  TextField,
  Card,
  Button,
  CardContent,
  Box,
} from "@mui/material";
import useConnected from "../../hooks/useConnected";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ROUTES, API_URL } from "../../utils/url";
import useActionPrivate from "../../hooks/useActionPrivate";
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
  const axiosPrivate = useActionPrivate();
  const [medecins, setMedecins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [hopitals, setHopitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [filterMedecins, setFilterMedcins] = useState([]);
  useEffect(() => {
    axiosPrivate
      .get(API_URL + API_ROUTES.PATIENTS)
      .then((res) => {
        setPatients(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosPrivate
      .get(API_URL + API_ROUTES.HOPITAL)
      .then((res) => {
        setHopitals(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosPrivate
      .get(API_URL + API_ROUTES.RADIOLOGUE)
      .then((res) => {
        setMedecins(res.data.results);
        setFilterMedcins(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosPrivate]);
  const handleChange = (event, value) => {
    if (value) {
      setSelectedHospitalId(value.id);
    } else {
      setSelectedHospitalId(null);
    }
  };
  useEffect(() => {
    if (selectedHospitalId !== null) {
      setFilterMedcins(
        medecins.filter((medecin) => medecin.hopital === selectedHospitalId)
      );
    }
  }, [selectedHospitalId]);
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bonjour {user?.first_name + " " + user?.last_name}
        </Typography>
        <Typography variant="h4" sx={{ mb: 5 }}>
          <Card
            variant="outlined"
            sx={{
              p: 0,
            }}
          >
            <Box
              sx={{
                padding: "15px 30px",
              }}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  Formulaire d'envoie d'images DICOM
                </Typography>
              </Box>
            </Box>
            <CardContent
              sx={{
                padding: "30px",
              }}
            >
              <Form encType="multipart/form-data" method="POST">
                <Autocomplete
                  id="patient"
                  options={patients}
                  getOptionLabel={(option) =>
                    option.first_name + " " + option.last_name
                  }
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField
                      required
                      name="patient"
                      {...params}
                      label="Choisir un patient"
                    />
                  )}
                  fullWidth
                />

                <Autocomplete
                  id="medecin"
                  autoHighlight
                  options={filterMedecins}
                  getOptionLabel={(option) =>
                    option.first_name + " " + option.last_name
                  }
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField
                      required
                      name="destinataire"
                      {...params}
                      label="Choisir un medecin"
                    />
                  )}
                  fullWidth
                />
                <TextField
                  type="file"
                  required
                  name="dicom"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  inputProps={{
                    accept: ".DCM", // Specify the accepted file types
                  }}
                />
                <div>
                  <Button type="submit" color="primary" variant="contained">
                    Submit
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </Typography>
      </Container>
    </>
  );
}
