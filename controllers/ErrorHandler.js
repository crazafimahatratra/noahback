/**
 * 
 * @param {Response} res
 * @param {{status: number, code: string, message: string}} error 
 */
export const sendError = (res, error) => {
    return res.status(error.status || 500).json({ code: error.code, message: error.message })
};
