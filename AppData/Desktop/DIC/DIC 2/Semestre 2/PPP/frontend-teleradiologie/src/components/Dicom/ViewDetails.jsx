import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import capitalize from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";
export default function ViewDetails({ personnel, patient, rapport }) {
  const [personnelAgent, setPersonnelAgent] = useState(personnel);
  const [patientTraiter, setPatientTraiter] = useState(patient);
  const navigate = useNavigate();
  const handleFile = () => {
    window.location.href = rapport.fichier;
  };

  return (
    <>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mx: "2px",
          width: "100%",
        }}
      >
        <Card>
          <CardContent variant="outlined" sx={{ px: "20px" }}>
            <Grid
              container
              rowSpacing={1}
              sx={{ px: 2 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={6}>
                <Typography sx={{ fontSize: 14 }}>
                  {capitalize(personnelAgent.type)}
                </Typography>
                <Typography variant="h4" component="div">
                  {personnelAgent.first_name + " " + personnelAgent.last_name}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Email</Typography>
                <Typography variant="h6" component="div">
                  {personnelAgent.email}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography sx={{ fontSize: 14 }}>Patient</Typography>
                <Typography variant="h4" component="div">
                  {patientTraiter.first_name + " " + patientTraiter.last_name}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Télephone</Typography>
                <Typography variant="h6" component="div">
                  {patientTraiter.tel}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>SEXE</Typography>
                <Typography variant="h6" component="div">
                  {patientTraiter.sexe}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Date de naissance</Typography>
                <Typography variant="h6" component="div">
                  {patientTraiter.adresse}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Adresse</Typography>
                <Typography variant="h6" component="div">
                  {patientTraiter.date_de_naissance}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            {rapport === null ? (
              <Typography variant="body1" sx={{ mx: "20px" }} color="error">
                Rapport non disponible
              </Typography>
            ) : (
              <Button variant="contained" onClick={handleFile}>
                <img
                  src="/assets/icons/shape-avatar.svg"
                  alt="my"
                  width={"20px"}
                />
                &nbsp; Visualiser le rapport
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
