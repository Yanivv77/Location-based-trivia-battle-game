import mongoose from 'mongoose';
import {logger}  from './logger';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    logger.info('JWT_KEY must be defined', process.env.NODE_ENV)
    throw new Error('JWT_KEY must be defined');
  }

  try {
    if (!process.env.USERS_MONGO_URI) {
      
      logger.info('USERS_MONGO_URI must be defined', process.env.NODE_ENV)
      throw new Error('USERS_MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.USERS_MONGO_URI);
    logger.info('Connected to MongoDb', process.env.NODE_ENV)
    
  } catch (err) {
    const { message } = err as Error;
    logger.info(message, process.env.NODE_ENV)
    
  }

  app.listen(process.env.PORT || 5000,  () => {
    logger.info('Listening on port 5000', process.env.NODE_ENV)
    
  });
};

start();
