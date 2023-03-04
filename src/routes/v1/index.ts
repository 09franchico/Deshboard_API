import { Router } from 'express';

import auth from './auth';
import users from './users';
import pessoa from './pessoa'

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/pessoa',pessoa)

export default router;
