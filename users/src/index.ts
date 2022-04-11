import mongoose from 'mongoose';
import {logger}  from './logger';

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

  app.listen(process.env.PORT || 5000,  () => {
    logger.info('Listening on port 5000', process.env.NODE_ENV)
    
  });
};

start();
