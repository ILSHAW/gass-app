import { PassportStrategy } from "@nestjs/passport"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Strategy } from "passport-custom"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

@Injectable()
export class SendStrategy extends PassportStrategy(Strategy, "send") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("User") private readonly userModel: IUserModel) {
        super()
    }
    async validate(req: Request) {
        const user = await this.userModel.findOne({ login: req.body.login })

        if(user) {
            return user
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}