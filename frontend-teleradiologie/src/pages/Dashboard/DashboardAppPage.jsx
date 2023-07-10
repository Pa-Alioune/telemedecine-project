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
  Alert,
} from "@mui/material";
import useConnected from "../../hooks/useConnected";
import { useEffect, useState } from "react";
import sleep from "../../utils/sleep";
import { API_ROUTES, API_URL, APP_ROUTES } from "../../utils/url";
import useActionPrivate from "../../hooks/useActionPrivate";
import { useNavigate } from "react-router-dom";
export default function DashboardAppPage() {
  // const theme = useTheme();
  const user = useConnected();
  const axiosPrivate = useActionPrivate();
  const [medecins, setMedecins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [hopitals, setHopitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [filterMedecins, setFilterMedcins] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMedecin, setSelectedMedecin] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
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
      setFilterMedcins(medecins);
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
  const handlePatientChange = (event, value) => {
    if (value) {
      setSelectedPatient(value.id);
    } else {
      setSelectedPatient("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("patient", selectedPatient);
    formData.append("destinataire", selectedMedecin);
    formData.append("envoyeur", user.id);
    formData.append("image", image);

    axiosPrivate
      .post(API_URL + API_ROUTES.DICOM + "/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSuccess(true);
        scrollToTop();
        setSelectedMedecin("");
        setSelectedPatient("");
        setImage(null);
        navigate(APP_ROUTES.DICOMS);
        event.target.reset();
        sleep(300);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const handleMedcinsChange = (event, value) => {
    if (value) {
      setSelectedMedecin(value.id);
    } else {
      setSelectedMedecin("");
    }
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bonjour {user?.first_name + " " + user?.last_name}
        </Typography>
        {success && <Alert severity="success">Image envoyer avec succés</Alert>}
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
                  Formulaire d&apos;envoie d&apos;images DICOM
                </Typography>
              </Box>
            </Box>
            <CardContent
              sx={{
                padding: "30px",
              }}
            >
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <Autocomplete
                  id="patient"
                  options={patients}
                  getOptionLabel={(option) =>
                    option.first_name + " " + option.last_name
                  }
                  onChange={handlePatientChange}
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
                  id="hopitale"
                  options={hopitals}
                  getOptionLabel={(option) => option.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choisir un hôpital" />
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
                  onChange={handleMedcinsChange}
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
                  onChange={handleImageChange}
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
              </form>
            </CardContent>
          </Card>
        </Typography>
      </Container>
    </>
  );
}
