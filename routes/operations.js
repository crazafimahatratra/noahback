import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/OperationController';

router.get('/operations', Controller.all);
router.post('/operations', Controller.create);
router.delete('/operations/:id', Controller.delete);

export default router;
