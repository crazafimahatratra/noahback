import db from '../models';
import bcrypt from 'bcryptjs';
import { sendError } from './ErrorHandler';
import UIDGenerator from 'uid-generator';
import addDate from 'date-fns/add';
const uidgen = new UIDGenerator(1024);

let User = db.User;

export const Errors = {
    UNAUTHORIZED: {
        status: 401,
        code: "USER_UNAUTHORIZED",
        message: "Unauthorized"
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
    }
};
