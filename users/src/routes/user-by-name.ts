import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get(
  '/api/users/username',
  [
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('username must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new BadRequestError('Invalid username');
    }

  
    res.status(200).send(existingUser);
  }
);

export { router as userByNameRouter };
