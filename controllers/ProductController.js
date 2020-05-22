import db from '../models';
import { sendError } from './ErrorHandler';
import sequelize from 'sequelize';

let Product = db.Product;

export const Errors = {
    ERROR_CREATE_PRODUCT: {
        status: 500, code: 'ERROR_CREATE_PRODUCT', message: 'Error while creating product'
    },
    ERROR_PRODUCT_NOT_FOUND: {
        status: 404, code: 'ERROR_PRODUCT_NOT_FOUND', message: 'Product not found',
    }
}

/**
 * 
 * @param {number} id
 * @returns {Promise<sequelize.Model>} 
 */
export const findById = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ where: { id: id } }).then(row => {
            if (row) resolve(row);
            else reject(Errors.ERROR_PRODUCT_NOT_FOUND);
        })
    })
}

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
                sendError(res, { status: 500, code: 'ERROR_CREATE_PRODUCT', message: 'Error while creating product' });
            })
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    delete: (req, res) => {
        findById(req.params.id)
            .then(row => { return row.destroy() })
            .then(() => res.json({ message: "Product deleted" }))
            .catch(err => sendError(res, err));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    update: (req, res) => {
        findById(req.params.id)
            .then(row => { return row.update(req.body) })
            .then(updated => res.json(updated))
            .catch(err => sendError(res, err));
    },
};
