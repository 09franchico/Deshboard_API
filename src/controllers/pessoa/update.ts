import { Request, Response, NextFunction } from 'express';
import { Pessoa } from 'orm/entities/pessoa/Pessoa';
import { getRepository } from 'typeorm';
import { IPessoa } from 'types/pessoa/pessoa';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const data = req.body as IPessoa;
  const pessoaRepository = getRepository(Pessoa);


  try {
    const pessoa = await pessoaRepository.findOne(id);
    if(!pessoa){
        const customError = new CustomError(404, 'General', `Pessoa with id:${id} not found.`, ['Pessoa not found.']);
        return next(customError);
    }

   const pessoaUpdate = await pessoaRepository
        .createQueryBuilder()
        .update(Pessoa)
        .set({ 
            nome:data.nome,
            sobrenome:data.sobrenome,
            email:data.email,
            rua:data.rua,
            bairro:data.bairro,
            numero:data.numero,
            complemento:data.complemento
        })
        .where("id = :id", { id: id })
        .execute()
    
    res.customSuccess(200, 'Update realizado com sucesso.', pessoaUpdate);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};