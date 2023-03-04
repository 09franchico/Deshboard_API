import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from 'orm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { CustomError } from 'utils/response/custom-error/CustomError';
import jwt from 'jsonwebtoken';


export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    try {
        const tokenVerif = token.split(' ')[1];
        let jwtPayload: { [key: string]: any };
        try {

          jwtPayload = jwt.verify(tokenVerif, process.env.JWT_SECRET as string) as { [key: string]: any };
          ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
          let user = jwtPayload as JwtPayload;
          res.json(user)


        } catch (err) {
          const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
          return next(customError);
        }
        
    } catch (err) {
      const customError = new CustomError(400, 'Raw', 'Error', null, err);
      return next(customError);
    }
  };