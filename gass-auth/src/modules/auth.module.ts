import { Module } from "@nestjs/common"

import { ExceptionService } from "@services/exception.service"
import { UserDatabaseModule } from "@modules/database.module"
import { AuthController } from "@controllers/auth.controller"
import { SignupStrategy } from "@strategies/signup.strategy"
import { AccessStrategy } from "@strategies/access.strategy"
import { LoginStrategy } from "@strategies/login.strategy"
import { AuthService } from "@services/auth.service"
import { JwtService } from "@services/jwt.service"
import { RsaService } from "@services/rsa.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        ExceptionService,
        JwtService,
        RsaService,
        SignupStrategy,
        LoginStrategy,
        AccessStrategy
    ]
})
export class AuthModule {}