import { Module } from "@nestjs/common"

import { ExceptionService } from "@services/exception.service"
import { UserController } from "@controllers/user.controller"
import { UserDatabaseModule } from "@modules/database.module"
import { AccessStrategy } from "@strategies/access.strategy"
import { UserService } from "@services/user.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        ExceptionService,
        AccessStrategy
    ]
})
export class UserModule {}