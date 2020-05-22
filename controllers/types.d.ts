export interface Request {
    body: object
}

export interface Response {
    json: (params: object) => {},
}
