import db from '../models';
import bcrypt from 'bcryptjs';
import { sendError } from './ErrorHandler';
import UIDGenerator from 'uid-generator';
import addDate from 'date-fns/add';
import isBefore from 'date-fns/isBefore';
import logger from '../logger';
const uidgen = new UIDGenerator(1024);

let User = db.User;

export const Errors = {
    UNAUTHORIZED: {
        status: 401,
        code: "USER_UNAUTHORIZED",
        message: "Unauthorized"
    },
    TOKEN_EXPIRED: {
        status: 401,
        code: "USER_TOKEN_EXPIRED",
        message: "Token expired"
    },
    ERROR_UPDATE_TOKEN: {
        status: 500,
        code: "USER_ERROR_UPDATE_TOKEN",
        message: "An error occured while updating token expiration"
    },
    ERROR_VERIFY_TOKEN: {
        status: 500,
        code: "USER_ERROR_VERIFY_TOKEN"
    },
};

const expiresOn = () => {
    return addDate(new Date(), {hours: 1});
}

export const Controller = {
    auth: (req, res) => {
        User.findOne({where: {login: req.body.login}}).then(row => {
            if(!row) {
                sendError(res, Errors.UNAUTHORIZED);
            } else {
                if(bcrypt.compareSync(req.body.password, row.password)) {
                    row.update({accessToken: uidgen.generateSync(), accessTokenExpires: expiresOn()}).then(row => {
                        res.json({
                            accessToken: row.accessToken, accessTokenExpires: row.accessTokenExpires,
                            name: row.name,
                            firstname: row.firstname
                        })
                    });
                } else {
                    sendError(res, Errors.UNAUTHORIZED);
                }
            }
        })
    },

    verify: (req, res, next) => {
        if (!req.headers.authorization) {
            sendError(res, Errors.UNAUTHORIZED);
            return;
        }
        User.findOne({ where: { accessToken: req.headers.authorization.replace('Bearer ', '') } }).then(emp => {
            if (!emp) {
                sendError(res, Errors.UNAUTHORIZED);
                return;
            }
            if (isBefore(emp.accessTokenExpires, new Date())) {
                return sendError(res, Errors.TOKEN_EXPIRED);
            }
            req.user = emp;
            emp.update({ accessTokenExpires: expiresOn() }).then(() => { next() }).catch(err => {
                logger.error(err);
                sendError(res, Errors.ERROR_UPDATE_TOKEN);
            });
        }).catch(err => {
            logger.error(err);
            sendError(res, Errors.ERROR_VERIFY_TOKEN);
        })
    },


    whoami: (req, res) => {
        User.findOne({ where: { accessToken: req.user.accessToken }, attributes: { exclude: ["password", "accessToken"] } }).then(row => {
            res.json(row);
        }).catch(err => {
            logger.error(err);
            res.status(500).json({ message: "An error occured" });
        });
    },
};
