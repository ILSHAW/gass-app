import { IsNotEmpty, IsString, IsEmail, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class SendDTO {
    @IsEmail({}, { message: "Login must be a valid email" })
    @IsString({ message: "Login must be a string" })
    @IsNotEmpty({ message: "Login is required" })
    login: string

    constructor(data: SendDTO) {
        this.login = data.login
    }
}

@Injectable()
export class SendGuard extends AuthGuard("send") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new SendDTO({ ...req.body }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}