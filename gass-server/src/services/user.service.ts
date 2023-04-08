import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

@Injectable()
export class UserService {
    constructor() {}

    async get(req: Request, res: Response) {
        return res.status(200).send({ message: "Information about user", user: {
            id: req.user.id,
            login: req.user.login,
            role: req.user.role,
            verified: req.user.verified
        }})
    }
}