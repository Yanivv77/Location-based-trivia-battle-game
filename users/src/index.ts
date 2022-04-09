import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    if (!process.env.USERS_MONGO_URI) {
      throw new Error('USERS_MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.USERS_MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
};

start();
