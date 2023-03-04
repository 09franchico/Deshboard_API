import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Pessoa } from 'orm/entities/pessoa/Pessoa';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(Pessoa);
  try {
    const pessoa = await userRepository.findOne(id);

    if (!pessoa) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    res.json(pessoa)
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};