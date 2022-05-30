import React from "react";

import { Box, Stack, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "#f0f4c3",
  filter: " opacity(95%)",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // background: "#90caf9",

  boxShadow: 24,
  p: 4,
};
const Loading = () => {
  return (
    <>
      <Box sx={style}>
        <Stack justifyContent="center" alignItems="center">
          <h3>Please wait till next question</h3>
          <div className=" w-55 container d-flex justify-content-center">
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_hzwndued.json"
              background="transparent"
              speed="0.5"
              loop
              autoplay
            ></lottie-player>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default Loading;
