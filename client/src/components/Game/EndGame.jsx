import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box, Paper, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { restartGame } from "../../features/game/gameSlice";
import LiderBoard from "../LeaderBoard";
import LeaderBoard from "../LeaderBoard";

const EndGame = () => {
  const [usersList, setUsersList] = useState([
    { userName: "user 1", points: "6/10" },
    { userName: "user 2", points: "8/10" },
    { userName: "user 3", points: "5/10" },
    { userName: "user 4", points: "3/10" },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuestionIndex, score, answers } = useSelector(
    (state) => state.quiz
  );

  return (
    <>
      <Box sx={{ m: "0 auto" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mt: 2,
            mb: 2,
            fontWeight: "bold",
            color: "##eeeeee",
          }}
        >
          Very good !
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
            fontWeight: "bold",
            color: "##eeeeee",
          }}
        >
          Your score is {score}/10
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: 10 }}
            onClick={() => {
              dispatch(restartGame());
            }}
          >
            Play Again !
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: 10 }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Exit Game
          </Button>
        </Stack>
        <LeaderBoard usersList={usersList} />
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Question </TableCell>
                <TableCell align="right">Correct answer</TableCell>
                <TableCell align="right">Your answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers?.map((answer, i) => (
                <TableRow
                  key={new Date().toUTCString()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ width: "60%" }}>
                    {i + 1}. {answer.question}
                  </TableCell>
                  <TableCell align="right" sx={{ width: "20%" }}>
                    {answer.correctAnswer}
                  </TableCell>
                  <TableCell align="right" sx={{ width: "20%" }}>
                    {answer.answer}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
    </>
  );
};

export default EndGame;
