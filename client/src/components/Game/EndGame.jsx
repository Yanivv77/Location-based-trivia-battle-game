import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Typography, Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { restartGame } from "../../features/game/gameSlice";

const EndGame = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, score, answers } = useSelector(
    (state) => state.quiz
  );

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ borderRadius: 10, mt: 5 }}
        onClick={() => {
          dispatch(restartGame());
        }}
      >
        Restart Game
      </Button>
      <Box sx={{ m: "0 auto" }}>
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
        <TableContainer component={Paper}>
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
        </TableContainer>
      </Box>
    </>
  );
};

export default EndGame;
