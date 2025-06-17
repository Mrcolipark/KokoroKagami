import {Router} from 'express';
import {getFortune} from '../controllers/fortune';

const router = Router();
router.get('/fortune', getFortune);

export default router;
