import { Module } from "@nestjs/common"

import { DatabaseModule } from "@modules/database.module"
import { ConfigModule } from "@modules/config.module"
import { MailerModule } from "@modules/mailer.module"
import { TokenModule } from "@modules/token.module"
import { EmailModule } from "@modules/email.module"
import { AuthModule } from "@modules/auth.module"

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        MailerModule,
        AuthModule,
        TokenModule,
        EmailModule
    ]
})
export class AppModule {}
