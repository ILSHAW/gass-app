import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request } from "express"
import * as path from "path"
import * as fs from "fs"

import { ExceptionService } from "@/services/exception.service"
import { RsaService } from "@/services/rsa.service"
import { IUserModel } from "@/models/user.model"

function fromRefreshCookie(req: Request) {
    const exceptionService = new ExceptionService()

    if(req.cookies.refresh) {
        return req.cookies.refresh
    }
    else {
        throw exceptionService.badRequest("Refresh cookie is required")
    }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("User") private readonly userModel: IUserModel, private readonly rsaService: RsaService) {
        super({
            secretOrKey: fs.readFileSync(path.resolve("keys/public.pem")),
            jwtFromRequest: ExtractJwt.fromExtractors([fromRefreshCookie]),
            passReqToCallback: true
        })
    }
    async validate(req: Request, payload: { id: string, fingerprint: string }) {
        const user = await this.userModel.findById(payload.id)
        
        if(user) {
            if(this.rsaService.decrypt(payload.fingerprint) === req.headers.fingerprint) {
                return user
            }
            else {
                throw this.exceptionService.unauthorized("Refresh token is invalid")
            }
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}