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
import { roomRouter } from "./Games/src/routes/room.route";
const path = require('path')

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
app.use(roomRouter);
app.use("/api/questions", questions);
app.use("/api/gamePlayers", gamePlayers);


// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.all("*", async (req, res) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };
