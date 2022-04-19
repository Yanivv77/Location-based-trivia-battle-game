import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Button } from "@mui/material";

import { reset } from "../features/auth/authSlice";
import NavBar from "../components/NavBar";
import LeftSideMenu from "../components/LeftSideMenu";

function ProfileScreen() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  user = user || { id: 5, name: "John" };

  const handleStartGame = () => {
    navigate("/gamelobby");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  return (
    <>
      <NavBar setOpen={setOpen} />
      <main className="mt-5">
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
              onClick={() => handleStartGame()}
            >
              Start New Game
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ borderRadius: 10, mt: 5 }}
            >
              Leader Board
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ borderRadius: 10, mt: 3 }}
            >
              Sugest a fact
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 10, mt: 3 }}
            >
              Sugest a question
            </Button>
          </Grid>
        </Grid>
      </main>
      <LeftSideMenu open={setOpen} isOpen={open} />
    </>
  );
}

export default ProfileScreen;
