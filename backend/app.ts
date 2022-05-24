import express from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
const { OAuth2Client } = require('google-auth-library');
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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID );
const path = require('path')
const users = [];

const app = express();
app.use(cors())
  



app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    
    signed: false,
    sameSite: 'none',
  })
);

app.use(currentUserRouter);
app.use(userByNameRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(signupRouter);
app.use(authGoogleRouter);

app.use("/api/questions", questions);
app.use("/api/gamePlayers", gamePlayers);
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

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

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}





app.use(errorHandler);

export { app };
