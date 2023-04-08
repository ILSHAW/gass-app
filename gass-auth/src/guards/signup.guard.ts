import { IsNotEmpty, IsString, IsEmail, validateSync } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class SignupDTO {
    @IsString({ message: "Name must be a string" })
    @IsNotEmpty({ message: "Name is required" })
    name: string
    @IsString({ message: "Surname must be a string" })
    @IsNotEmpty({ message: "Surname is required" })
    surname: string
    @IsEmail({}, { message: "Login must be a valid email" })
    @IsString({ message: "Login must be a string" })
    @IsNotEmpty({ message: "Login is required" })
    login: string
    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    password: string

    constructor(data: SignupDTO) {
        this.name = data.name
        this.surname = data.surname
        this.login = data.login
        this.password = data.password
    }
}

@Injectable()
export class SignupGuard extends AuthGuard("signup") {
    constructor(private readonly exceptionService: ExceptionService) { super() }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        const errors = validateSync(new SignupDTO({ ...req.body }))

        if(errors.length === 0) {
            return super.canActivate(context)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}