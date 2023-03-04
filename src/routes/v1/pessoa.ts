import { create } from 'controllers/pessoa';
import { list } from 'controllers/pessoa';
import { Router } from 'express';


const router = Router();

router.get('/',list);
router.post('/',create)


export default router;