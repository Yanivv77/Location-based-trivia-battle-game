import express from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { currentUserRouter } from "./Users/src/routes/auth/current-user";
import { loginRouter } from "./Users/src/routes/auth/login";
import { userByNameRouter } from "./Users/src/routes/auth/user-by-name";
import { authGoogleRouter } from "./Users/src/routes/auth/google-auth";
import { logoutRouter } from "./Users/src/routes/auth/logout";
import { signupRouter } from "./Users/src/routes/auth/signup";
import { errorHandler } from "./Users/src/middlewares/error-handler";
import { NotFoundError } from "./Users/src/errors/not-found-error";
import { questions } from "./questions/src/routes/questions";
import { gamePlayers } from "./GamePlayers/src/routes/gamePlayers";
import { gameRouter"} from "./Games/src/routes/createGame";


const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(currentUserRouter);
app.use(userByNameRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(signupRouter);
app.use(authGoogleRouter);
app.use(gameRouter);
app.use("/api/questions", questions);
app.use("/api/gamePlayers", gamePlayers);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
