import { list } from 'controllers/pessoa/list';
import { Router } from 'express';


const router = Router();

router.get('/',list);


export default router;