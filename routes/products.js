import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/ProductController';

router.get('/products', Controller.all);
router.post('/products', Controller.create);

export default router;
