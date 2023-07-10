import {
  Alert,
  Box,
  Button,
  CardContent,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useActionPrivate from "../../hooks/useActionPrivate";
import { useParams } from "react-router-dom";
import { API_ROUTES, API_URL } from "../../utils/url";
import ViewDetails from "../../components/Dicom/viewDetails";

export function OneDicomReceve() {
  const axios = useActionPrivate();
  const [dicom, setDicom] = useState(null);
  const params = useParams();
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [rapport, setRapport] = useState(null);
  useEffect(() => {
    axios
      .get(API_URL + API_ROUTES.DICOM + "/" + params.id)
      .then((response) => {
        setDicom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axios, params.id]);
  useEffect(() => {
    if (dicom?.rapport !== undefined && dicom?.rapport !== null) {
      axios
        .get(API_URL + API_ROUTES.RAPPORT + "/" + dicom?.rapport)
        .then((response) => {
          setRapport(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [axios, dicom]);
  const variants = ["h1", "h3", "body1", "caption"];
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    console.log(dicom.id_image);
    formData.append("fichier", image);
    formData.append("patient", dicom.patient.id);
    formData.append("envoyeur", dicom.destinataire.id);
    formData.append("destinataire", dicom.envoyeur.id);
    formData.append("image_dicom", dicom.id);

    axios
      .post(API_URL + API_ROUTES.RAPPORT + "/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(null);
        setSuccess(true);
        setRapport(response.data);
        event.target.reset();
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <>
      {dicom !== null ? (
        <div>
          {success && (
            <Alert severity="success">Rapport envoyé avec succés</Alert>
          )}

          <ViewDetails
            personnel={dicom?.envoyeur}
            patient={dicom?.patient}
            rapport={rapport}
            image={dicom?.parent_series}
          />
          {rapport === null && (
            <div style={{ padding: "20px" }}>
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
                    Rapport en PDF
                  </Typography>
                </Box>
              </Box>
              <CardContent
                sx={{
                  padding: "10px",
                }}
              ></CardContent>
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <TextField
                  type="file"
                  required
                  name="fichier"
                  variant="outlined"
                  onChange={handleImageChange}
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  inputProps={{
                    accept: ".pdf", // Specify the accepted file types
                  }}
                />
                <div>
                  <Button type="submit" color="primary" variant="contained">
                    Soummettre
                  </Button>
                </div>
              </form>
            </div>
          )}
          <iframe
            src={`http://localhost:8042/web-viewer/app/viewer.html?series=${dicom.parent_series}`}
            width="100%"
            height="500px"
            title="PDF Viewer"
          />
        </div>
      ) : (
        <Grid container spacing={8}>
          <Grid item xs>
            {variants.map((variant) => (
              <Typography component="div" key={variant} variant={variant}>
                <Skeleton />
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
}
