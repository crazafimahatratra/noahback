import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/UserController';

router.post('/auth', Controller.auth);

export default router;
