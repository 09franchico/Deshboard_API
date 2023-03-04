import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Pessoa } from 'orm/entities/pessoa/Pessoa';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const pessoaRepository = getRepository(Pessoa);
  try {
    const pessoa = await pessoaRepository.findOne({ where: { id } });

    if (!pessoa) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User with id:${id} doesn't exists.`]);
      return next(customError);
    }
    pessoaRepository.delete(id);

    res.customSuccess(200, 'User successfully deleted.', { id: pessoa.id, name: pessoa.sobrenome, email: pessoa.email });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};