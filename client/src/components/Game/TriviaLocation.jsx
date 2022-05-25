import React from "react";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NearByModal from "../Game/NearByModal";
import { useTranslation } from "react-i18next";

const TriviaLocation = () => {
  const { t } = useTranslation(["Game/TriviaLocation"]);

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="medium"
        sx={{ borderRadius: 10, mt: 1 }}
        onClick={() => {
          navigate("/profile");
        }}
      >
        {t("go back")}
      </Button>
      <Box sx={{ maxWidth: "400px", m: "0 auto", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
            fontWeight: "bold",
            fontFamily: "Dollan",
            color: "##eeeeee",
          }}
        >
          {t("to start the game please choose trivia location")}
        </Typography>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ borderRadius: 10, mt: 5 }}
              onClick={handleOpen}
            >
              {t("near by location")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ borderRadius: 10, mt: 5 }}
            >
              {t("location on map")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ borderRadius: 10, mt: 3 }}
            >
              {t("location from list")}
            </Button>
          </Grid>
        </Grid>
        <NearByModal open={open} handleClose={handleClose} />
      </Box>
    </>
  );
};

export default TriviaLocation;
