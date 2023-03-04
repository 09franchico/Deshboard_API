import { Request, Response, NextFunction } from 'express';
import { Pessoa } from 'orm/entities/pessoa/Pessoa';
import { getRepository } from 'typeorm';
import { IPessoa } from 'types/pessoa/pessoa';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as IPessoa;
  const pessoaRepository = getRepository(Pessoa);

  const pessoaEmail = await pessoaRepository.findOne({where:{email:data.email}})

  if(pessoaEmail){
    const customError = new CustomError(400, 'General', `${data.email} ja existe!`, ['Email not found.']);
    return next(customError);
  }

  try {

  const pessoa = await pessoaRepository
    .createQueryBuilder()
    .insert()
    .into(Pessoa)
    .values({
        nome:data.nome,
        sobrenome:data.sobrenome,
        email:data.email,
        rua:data.rua,
        bairro:data.bairro,
        numero:data.numero,
        complemento:data.complemento
        
    })
    .execute()
    
    res.customSuccess(200, 'Listagem de pessoa.', pessoa);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};