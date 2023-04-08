import { Injectable, NestMiddleware, Logger } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP")

	use(req: Request, res: Response, next: NextFunction) {
		res.on("close", () => this.logger.log(`${req.method} - ${req.url} - ${res.statusCode}`)); next();
	}
}