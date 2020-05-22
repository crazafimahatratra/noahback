import db from '../models';
import { sendError } from './ErrorHandler';
import UIDGenerator from 'uid-generator';
import logger from '../logger';

let Product = db.Product;

export const Controller = {
    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    all: (req, res) => {
        Product.findAll().then(rows => res.json(rows));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    create: (req, res) => {
        Product.create(req.body).then(row => res.json(row))
        .catch(err => {
            console.log(err);
            sendError(res, {status: 500, code: 'ERROR_CREATE_PRODUCT', message: 'Error while creating product'});
        })
    }
};
