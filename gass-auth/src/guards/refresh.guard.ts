import { IsNotEmpty, IsString, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class RefreshDTO {
    @IsString({ message: "Refresh token must be a string" })
    @IsNotEmpty({ message: "Refresh cookie is required" })
    token: string
    @IsString({ message: "Fingerprint must be a string" })
    @IsNotEmpty({ message: "Fingerprint is required" })
    fingerprint: string

    constructor(data: RefreshDTO) {
        this.token = data.token
        this.fingerprint = data.fingerprint
    }
}

@Injectable()
export class RefreshGuard extends AuthGuard("refresh") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new RefreshDTO({ token: req.cookies.refresh, fingerprint: (req.headers.fingerprint as string) }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}