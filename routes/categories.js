import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/CategoryController';

router.get('/categories', Controller.all);
router.post('/categories', Controller.create);
router.delete('/categories/:id', Controller.delete);
router.put('/categories/:id', Controller.update);

export default router;
