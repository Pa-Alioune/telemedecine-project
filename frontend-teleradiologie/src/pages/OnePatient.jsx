import { useEffect, useState } from "react";
import useActionPrivate from "../hooks/useActionPrivate";
import { API_ROUTES, API_URL, APP_ROUTES } from "../utils/url";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function OnePatient() {
  const axios = useActionPrivate();
  const [patient, setPatient] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const handleRedirect = (event, patient) => {
    navigate(APP_ROUTES.DICOMS + "/" + patient.id);
    event.stopPropagation();
  };
  const fetch = async (id) => {
    try {
      const response = await axios.get(API_URL + API_ROUTES.DICOM + "/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(API_URL + API_ROUTES.PATIENTS + "/" + params?.id)
      .then((res) => {
        setPatient(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios, params]);

  useEffect(() => {
    if (patient?.images.length > 0) {
      for (const image of patient.images) {
        fetch(image?.id).then((data) => {
          let isObjectNotInArray = !imagesData.find(
            (element) => element.id === data.id
          );
          if (isObjectNotInArray) {
            imagesData.push(data);
          }
        });
      }
      setImagesData(imagesData);
    }
  }, [patient]);
  console.log(imagesData);
  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Information sur le patient
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Prénom: {patient?.first_name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Nom: {patient?.last_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">téléphone: {patient?.tel}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Date de naissance : {patient?.date_de_naissance}
          </Typography>
        </Grid>
      </Grid>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                numéro
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Envoyeur
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Destinataire
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                visualiser
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patient?.images.map((image, num) => (
            <TableRow key={image.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {num + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {imagesData[num]?.envoyeur.first_name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {imagesData[num]?.destinataire.first_name}
                </Typography>
              </TableCell>
              <TableCell>
                {image?.rapport !== null ? (
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: "success.main",
                      color: "#fff",
                    }}
                    size="small"
                    label="traité"
                  ></Chip>
                ) : (
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: "error.main",
                      color: "#fff",
                    }}
                    size="small"
                    label="en attente"
                  >
                    {" "}
                  </Chip>
                )}
              </TableCell>
              <TableCell onClick={(event) => handleRedirect(event, image)}>
                <Button variant="text">voir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
