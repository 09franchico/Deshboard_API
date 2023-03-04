import { Request, Response, NextFunction } from 'express';
import { Pessoa } from 'orm/entities/pessoa/Pessoa';
import { getRepository } from 'typeorm';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Pessoa);
  try {
    const pessoa = await userRepository.find();
    res.customSuccess(200, 'Listagem de pessoa.', pessoa);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};