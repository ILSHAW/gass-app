import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailerModule as BaseMailerModule } from "@nestjs-modules/mailer"
import { Module } from "@nestjs/common"

const mailerModule = BaseMailerModule.forRoot({
    transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "pe4enka519@gmail.com",
            pass: "ldemtztixusqsqer"
        }
    },
    template: {
        dir: "src/templates",
        adapter: new HandlebarsAdapter()
    }
})

@Module({
    imports: [mailerModule],
    exports: [mailerModule]
})
export class MailerModule {}