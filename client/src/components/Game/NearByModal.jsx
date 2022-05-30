import { React, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setGame } from "../../features/game/gameSlice";
import useGeoLocation from "../../hooks/useGeoLocation";
import Geocode from "react-geocode";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#90caf9",

  boxShadow: 24,
  p: 4,
};

const NearByModal = ({ open, handleClose }) => {
  const { t } = useTranslation(["Game/NearByModal"]);

  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const location = useGeoLocation();
  // console.log(location);

  const getLoc = (lat, lng) => {
    Geocode.setApiKey("AIzaSyD4VnQsROeVujhETWDP0myYg1Z8QjPx1IU");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const loc = response.results[0].address_components[2].long_name;
        setCity(loc);
      },
      (error) => {
        console.error(error);
        setCity(error.toString());
      }
    );
  };

  const handleNextButton = () => {
    dispatch(setGame());
  };

  useEffect(() => {
    if (location.coordinates.lat) {
      getLoc(location.coordinates.lat, location.coordinates.lng);
    }
  }, [location.coordinates.lat, location.coordinates.lng]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mt: 2, mb: 3 }}
            >
              {t("current location")}
            </Typography>

            <Paper
              elevation={2}
              sx={{ m: "0 auto", width: "90%", minHeight: "120px", p: 2 }}
            >
              <Typography
                id="transition-modal-title"
                variant="body"
                component="p"
              >
                {city}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="success"
              size="medium"
              sx={{ borderRadius: 5, mt: 5 }}
              onClick={handleNextButton}
            >
              {t("next")}
            </Button>
            <Button
              variant="contained"
              color="success"
              size="medium"
              sx={{ borderRadius: 5, mt: 5 }}
              onClick={handleClose}
            >
              {t("back")}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NearByModal;
