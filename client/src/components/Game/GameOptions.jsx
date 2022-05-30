import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, Slider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiUsers from "../Game/MultiUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  initGame,
  createGame,
  setTimer,
  setNumberOfQuestions,
} from "../../features/game/gameSlice";
import { useTranslation } from "react-i18next";

const GameOptions = () => {
  const { secondsPerQuestion, numberOfQuestions } = useSelector(
    (state) => state.game.gameOptions
  );
  const [multi, setMulti] = useState(false);
  const [value, setValue] = useState(secondsPerQuestion || 30);
  const { t } = useTranslation(["Game/GameOptions"]);

  const dispatch = useDispatch();

  const handleTimerChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(setTimer(newValue));
  };
  const handleQuestionsChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(setNumberOfQuestions(newValue));
  };

  useEffect(() => {
    console.log(secondsPerQuestion);
  }, [value]);
  return (
    <>
      {!multi ? (
        <>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",

              fontWeight: "bold",
              color: "##eeeeee",
            }}
          >
            {t("choose game options")}
          </Typography>

          <Box sx={{ maxWidth: "400px", m: "0 auto" }}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", mt: 1 }}
            >
              <Grid item xs={12}>
                <Box sx={{ width: 200 }}>
                  <Typography
                    color="primary"
                    id="discrete-slider-custom"
                    gutterBottom
                    sx={{
                      textAlign: "center",
                      mt: 1,

                      fontWeight: "bold",
                      color: "##eeeeee",
                    }}
                  >
                    {t("seconds per question")} {secondsPerQuestion}
                  </Typography>
                  <Slider
                    value={secondsPerQuestion}
                    aria-label="Timer"
                    onChange={handleTimerChange}
                    valueLabelDisplay="auto"
                    min={10}
                    max={30}
                    color="secondary"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: 200 }}>
                  <Typography
                    color="primary"
                    id="discrete-slider-custom"
                    gutterBottom
                    sx={{
                      textAlign: "center",

                      fontWeight: "bold",
                      color: "##eeeeee",
                    }}
                  >
                  {t("questions")}  {numberOfQuestions}
                  </Typography>
                  <Slider
                    value={numberOfQuestions}
                    aria-label="Questions"
                    step={5}
                    onChange={handleQuestionsChange}
                    valueLabelDisplay="auto"
                    min={5}
                    max={15}
                    color="secondary"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{ borderRadius: 10 }}
                    onClick={() => {
                      dispatch(initGame());
                    }}
                  >
                    {t("go back")}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: 10 }}
                    onClick={() => {
                      // dispatch(fetchQuestions());
                      dispatch(createGame());
                      setMulti(true);
                    }}
                  >
                    {t("continue")}
                  </Button>
                </Stack>
              </Grid>
              <Grid
                container
                spacing={1}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 250,
                    display: { xs: "block", sm: "none", md: "block" },
                  }}
                >
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_igywev6p.json"
                    background="transparent"
                    speed="0.4"
                    autoplay
                  ></lottie-player>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <MultiUsers />
      )}
    </>
  );
};

export default GameOptions;
