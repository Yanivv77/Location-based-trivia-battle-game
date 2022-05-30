import React, { useState } from "react";
import CustomSelect from "../components/Shared/CustomSelect";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Box,
  Button,
  Typography,
  Tooltip,
  Paper,
} from "@mui/material";

const SugestQuestion = () => {
  const navigate = useNavigate();
  const [showToolTip, setShowToolTip] = useState(false);

  const [location, setLocation] = useState("israel");
  const [place, setPlace] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswer1, setWrongAnswer1] = useState("");
  const [wrongAnswer2, setWrongAnswer2] = useState("");
  const [wrongAnswer3, setWrongAnswer3] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const locationLabels = [
    { text: "Israel", value: "israel" },
    { text: "USA", value: "usa" },
  ];
  // "Easy" | "Normal" | "Hard";

  const difficultyLabels = [
    { text: "Easy", value: "easy" },
    { text: "Normal", value: "normal" },
    { text: "Hard", value: "Hard" },
  ];
  const placeLabels =
    location === "Israel"
      ? [
          { text: "Tel-Aviv", value: "tel-aviv" },
          { text: "Jerusalem", value: "jerusalem" },
          { text: "All places", value: "all" },
        ]
      : [
          { text: "New-York", value: "new-york" },
          { text: "Washington", value: "washington" },
          { text: "All places", value: "all" },
        ];
  const handleSugest = () => {
    setShowToolTip(true);
    setTimeout(() => {
      navigate("/profile");
    }, 4000);
  };

  return (
    <Box sx={{ width: "100% vw", mt: 1 }}>
      <CustomSelect
        name="Location"
        value={location}
        setValue={setLocation}
        labels={locationLabels}
      />
      <CustomSelect
        name="Place"
        value={place}
        setValue={setPlace}
        labels={placeLabels}
      />
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <TextField
          id="outlined-multiline-flexible"
          label="Question"
          multiline
          maxRows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
          id="correct"
          label="Correct Answer"
          value={correctAnswer}
          //    helperText="Some important text"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <TextField
          id="wrong1"
          label="Wrong Answer 1"
          value={wrongAnswer1}
          //    helperText="Some important text"
          onChange={(e) => setWrongAnswer1(e.target.value)}
        />
        <TextField
          id="wrong2"
          label="Wrong Answer 2"
          value={wrongAnswer2}
          //    helperText="Some important text"
          onChange={(e) => setWrongAnswer2(e.target.value)}
        />
        <TextField
          id="wrong3"
          label="Wrong Answer 3"
          value={wrongAnswer3}
          //    helperText="Some important text"
          onChange={(e) => setWrongAnswer3(e.target.value)}
        />
        <CustomSelect
          name="Dificulty"
          value={difficulty}
          setValue={setDifficulty}
          labels={difficultyLabels}
        />
      </Stack>
      <Paper
        sx={{
          width: "95%",
          minHeight: "100px",
          bgcolor: "white",
          m: "0 auto",
          mt: 1,
          mb: 1,
          p: 1,
          overflowWrap: "anywhere",
        }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          component="p"
          sx={{ width: "100%" }}
        >
          Question : {question ? `"${question}"` : ""}
        </Typography>

        <Typography variant="subtitle2" gutterBottom component="div">
          Correct Answer : {correctAnswer ? `"${correctAnswer}"` : ""}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          Wrong Answer 1 : {wrongAnswer1 ? `"${wrongAnswer1}"` : ""}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          Wrong Answer 2: {wrongAnswer2 ? `"${wrongAnswer2}"` : ""}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          Wrong Answer 3: {wrongAnswer3 ? `"${wrongAnswer3}"` : ""}
        </Typography>
      </Paper>
      <Box>
        <Tooltip
          open={showToolTip}
          placement="top-start"
          title={"Thank you for sugesting !"}
          leaveDelay={2000}
          onClose={() => setShowToolTip(false)}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: 10, mt: 5 }}
            onClick={handleSugest}
          >
            Sugest Question
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SugestQuestion;
