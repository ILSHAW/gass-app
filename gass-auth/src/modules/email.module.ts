import { Module } from "@nestjs/common"

import { EmailController } from "@controllers/email.controller"
import { ExceptionService } from "@services/exception.service"
import { ConfirmStrategy } from "@strategies/confirm.strategy"
import { UserDatabaseModule } from "@modules/database.module"
import { SendStrategy } from "@strategies/send.strategy"
import { EmailService } from "@services/email.service"
import { JwtService } from "@services/jwt.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [EmailController],
    providers: [
        EmailService,
        ConfirmStrategy,
        ExceptionService,
        JwtService,
        SendStrategy
    ]
})
export class EmailModule {}