export interface userInterface {
    _id?:string,
    name: string,
    email: string,
    password: string
}

export interface userPayload {
    role: string,
    _id: string,
}