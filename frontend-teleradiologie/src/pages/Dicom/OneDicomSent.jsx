import { useEffect, useState } from "react";
import useActionPrivate from "../../hooks/useActionPrivate";
import { useParams } from "react-router-dom";
import { API_ROUTES, API_URL } from "../../utils/url";
import ViewDetails from "../../components/Dicom/viewDetails";
import { Grid, Skeleton, Typography } from "@mui/material";

export function OneDicomSent() {
  const axios = useActionPrivate();
  const [dicom, setDicom] = useState(null);
  const [rapport, setRapport] = useState(null);

  const variants = ["h1", "h3", "body1", "caption"];
  const params = useParams();
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
  return (
    <>
      {dicom !== null ? (
        <div>
          <ViewDetails
            personnel={dicom?.destinataire}
            patient={dicom?.patient}
            rapport={rapport}
            image={dicom?.parent_series}
          />
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
