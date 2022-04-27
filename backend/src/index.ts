import mongoose from 'mongoose';
import { app } from './app';


const url = process.env.MONGO_CONNECTION_STRING
const port = process.env.PORT || 5000
const jwtKey = process.env.JWT_KEY


const start = async () => {
  if (!jwtKey) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    if (url){
    await mongoose.connect(url);
    console.log('Connected to MongoDb');
    }
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log('Listening on port 5000!');
  });
};

start();
