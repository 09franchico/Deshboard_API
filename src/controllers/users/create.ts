import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { IUsuario } from 'types/user';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    
  const data = req.body as IUsuario
  const userRepository = getRepository(User);
  try {

    const user = userRepository.create({
        username:data.username,
        name:data.name,
        email:data.email,
        password:data.password,
        role:data.role
    })

    const userSave = await userRepository.save(user)
    res.customSuccess(200, 'List of users.', userSave);

  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
