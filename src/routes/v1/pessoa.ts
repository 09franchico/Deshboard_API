import { create, destroy, show, update } from 'controllers/pessoa';
import { list } from 'controllers/pessoa';
import { Router } from 'express';
import { checkJwt } from 'middleware/checkJwt';


const router = Router();

router.get('/',[checkJwt],list);
router.post('/',[checkJwt],create)
router.get('/:id',[checkJwt],show)
router.put('/:id',[checkJwt],update)
router.delete('/:id',[checkJwt],destroy)


export default router;