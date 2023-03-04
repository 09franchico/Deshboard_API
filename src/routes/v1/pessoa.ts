import { create, destroy, show, update } from 'controllers/pessoa';
import { list } from 'controllers/pessoa';
import { Router } from 'express';


const router = Router();

router.get('/',list);
router.post('/',create)
router.get('/:id',show)
router.put('/:id',update)
router.delete('/:id',destroy)


export default router;