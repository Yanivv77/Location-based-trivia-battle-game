import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { logger } from '../../../logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
   
  logger.error(err.message)
  console.log(err)
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
