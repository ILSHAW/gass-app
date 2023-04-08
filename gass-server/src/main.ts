import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { Logger } from "@nestjs/common"
import * as cookie from "cookie-parser"

import { EverythingExceptionFilter } from "@filters/everything.exception.filter"
import { HttpExceptionsFilter } from "@filters/http-exceptions.filter"
import { NotFoundExceptionFilter } from "@filters/not-found.filter"
import { ValidationPipe } from "@pipes/validation.pipe"
import { AppModule } from "@modules/app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger("SERVER")
	const options = new DocumentBuilder().setTitle("Server API").setVersion("1.0.0").addCookieAuth("access").build()
	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup("api", app, document)

	app.useGlobalFilters(new EverythingExceptionFilter(), new HttpExceptionsFilter(), new NotFoundExceptionFilter())
	app.useGlobalPipes(new ValidationPipe())
	app.use(cookie())

	await app.listen(config.get("app.port"), () => logger.log(`Server is running on http://127.0.0.1:${config.get("app.port")}`))
}
bootstrap()
