import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/auth/current-user';
import { loginRouter } from './routes/auth/login';
import { logoutRouter } from './routes/auth/logout';
import { signupRouter } from './routes/auth/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';



const app = express();
app.use(cors())
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    
  })
);

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
