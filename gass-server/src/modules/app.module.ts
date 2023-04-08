import { Module } from "@nestjs/common"

import { DatabaseModule } from "@modules/database.module"
import { ConfigModule } from "@modules/config.module"
import { UserModule } from "@modules/user.module"

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        UserModule
    ]
})
export class AppModule {}