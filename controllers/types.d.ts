export interface Request {
    body: object,
    params: object,
}

export interface Response {
    json: (params: object) => {},
}
