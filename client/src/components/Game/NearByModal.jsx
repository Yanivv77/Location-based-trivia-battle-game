import React from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#90caf9",

  boxShadow: 24,
  p: 4,
};

const NearByModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const location = useGeoLocation();
  console.log(location);

  const handleNextButton = () => {
    dispatch(setGame());
  };

  return (
    <div>
      {" "}
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
              GPS Location
            </Typography>
            <Paper
              elevation={2}
              sx={{ m: "0 auto", width: "90%", minHeight: "120px" }}
            >
              <Typography
                id="transition-modal-title"
                variant="body"
                component="p"
              >
                {location.loaded
                  ? `lat: ${location.coordinates.lat} , long: ${location.coordinates.lng}`
                  : "Location not ready yet"}
                {/* Your location is Nof Agalil */}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="success"
              size="medium"
              sx={{ borderRadius: 5, mt: 5 }}
              onClick={handleNextButton}
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="success"
              size="medium"
              sx={{ borderRadius: 5, mt: 5 }}
              onClick={handleClose}
            >
              Go Back
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NearByModal;
