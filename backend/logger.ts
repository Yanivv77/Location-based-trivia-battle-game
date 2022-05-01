
var winston = require('winston');
require('winston-mongodb');

const url = process.env.MONGO_CONNECTION_STRING


const customFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // log the full stack
  winston.format.timestamp(), // get the time stamp part of the full log message
  winston.format.printf(({ level, message, timestamp, stack }:any) => {
    
    return `${timestamp} ${level}: ${message} - ${stack}`;
  }),
  winston.format.metadata()
  
  );

const logger = winston.createLogger({
  format: customFormat,
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MONGO_CONNECTION_STRING,
      collection: 'logs',
    }),
  ],
})

export { logger }
