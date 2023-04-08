import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request } from "express"
import * as path from "path"
import * as fs from "fs"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

function fromQueryString(req: Request) {
    const exceptionService = new ExceptionService()

    if((req.query.token as string)) {
        return (req.query.token as string)
    }
    else {
        throw exceptionService.badRequest("Confirmation token is required")
    }
}

@Injectable()
export class ConfirmStrategy extends PassportStrategy(Strategy, "confirm") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("User") private readonly userModel: IUserModel) {
        super({
            secretOrKey: fs.readFileSync(path.resolve("keys/public.pem")),
            jwtFromRequest: ExtractJwt.fromExtractors([fromQueryString])
        })
    }
    async validate(payload: { id: string }) {
        const user = await this.userModel.findById(payload.id)

        if(user) {
            return user
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}