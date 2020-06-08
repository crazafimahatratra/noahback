import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/OperationController';

router.get('/operations', Controller.all);
router.post('/operations', Controller.create);
router.delete('/operations/:id', Controller.delete);
router.put('/operations/:id', Controller.update);
router.get('/search/:pattern', Controller.search);

export default router;
