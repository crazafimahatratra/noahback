import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/UserController';

router.post('/auth', Controller.auth);
router.use(Controller.verify);
router.get('/me', Controller.whoami);

export default router;
