import { HttpStatus, HttpException } from "@nestjs/common"

export class InternalServerErrorException extends HttpException {
	constructor(message: string) {
        super({ message }, HttpStatus.INTERNAL_SERVER_ERROR)
	}
}