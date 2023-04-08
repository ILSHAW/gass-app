import { IsNotEmpty, IsString, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class AccessDTO {
    @IsString({ message: "Access token must be a string" })
    @IsNotEmpty({ message: "Access cookie is required" })
    token: string

    constructor(data: AccessDTO) {
        this.token = data.token
    }
}

@Injectable()
export class AccessGuard extends AuthGuard("access") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new AccessDTO({ token: req.cookies.access }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}