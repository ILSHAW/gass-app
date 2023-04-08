import { IsNotEmpty, IsString, IsEmail, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class LoginDTO {
    @IsEmail({}, { message: "Login must be a valid email" })
    @IsString({ message: "Login must be a string" })
    @IsNotEmpty({ message: "Login is required" })
    login: string
    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    password: string
    @IsString({ message: "Fingerprint must be a string" })
    @IsNotEmpty({ message: "Fingerprint is required" })
    fingerprint: string

    constructor(data: LoginDTO) {
        this.login = data.login
        this.password = data.password
        this.fingerprint = data.fingerprint
    }
}

@Injectable()
export class LoginGuard extends AuthGuard("login") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new LoginDTO({ fingerprint: (req.headers.fingerprint as string), ...req.body }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}