import db from '../models';
import { sendError } from './ErrorHandler';
import sequelize from 'sequelize';

let Operation = db.Operation;

export const Errors = {
    ERROR_CREATE_OPERATION: {
        status: 500, code: 'ERROR_CREATE_OPERATION', message: 'Error while creating operation'
    },
    ERROR_OPERATION_NOT_FOUND: {
        status: 404, code: 'ERROR_OPERATION_NOT_FOUND', message: 'Operation not found',
    }
}

/**
 * 
 * @param {number} id
 * @returns {Promise<sequelize.Model>} 
 */
export const findById = (id) => {
    return new Promise((resolve, reject) => {
        Operation.findOne({ where: { id: id }, include: ["category"] }).then(row => {
            if (row) resolve(row);
            else reject(Errors.ERROR_OPERATION_NOT_FOUND);
        })
    })
}

export const Controller = {
    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    all: (req, res) => {
        Operation.findAll({ include: ["category"], order: ["date"] }).then(rows => res.json(rows));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    create: (req, res) => {
        Operation.create(req.body, { include: ["category"] })
            .then(row => findById(row.id))
            .then(row => res.json(row))
            .catch(err => {
                console.log(err);
                sendError(res, Errors.ERROR_CREATE_OPERATION);
            })
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    update: (req, res) => {
        findById(req.params.id)
            .then(row => {
                return row.update(req.body)
            })
            .then(row => findById(row.id))
            .then(row => res.json(row))
            .catch(err => sendError(res, err))
            .catch(err => { console.error(err); res.status(500).json("Error") })
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     */
    delete: (req, res) => {
        findById(req.params.id)
            .then(row => { return row.destroy() })
            .then(() => res.json({ message: "Operation deleted" }))
            .catch(err => sendError(res, err));
    }
};
