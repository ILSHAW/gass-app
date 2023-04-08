import { Module } from "@nestjs/common"

import { TokenController } from "@controllers/token.controller"
import { RefreshStrategy } from "@strategies/refresh.strategy"
import { ExceptionService } from "@services/exception.service"
import { UserDatabaseModule } from "@modules/database.module"
import { TokenService } from "@services/token.service"
import { JwtService } from "@services/jwt.service"
import { RsaService } from "@services/rsa.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [TokenController],
    providers: [
        TokenService,
        ExceptionService,
        JwtService,
        RsaService,
        RefreshStrategy
    ]
})
export class TokenModule {}