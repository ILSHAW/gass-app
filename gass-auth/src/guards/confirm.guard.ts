import { IsNotEmpty, IsString, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class ConfirmDTO {
    @IsString({ message: "Confirmation token must be a string" })
    @IsNotEmpty({ message: "Confirmation token is required" })
    token: string

    constructor(data: ConfirmDTO) {
        this.token = data.token
    }
}

@Injectable()
export class ConfirmGuard extends AuthGuard("confirm") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new ConfirmDTO({ token: (req.query.token as string) }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}