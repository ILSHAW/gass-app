import { HttpStatus, HttpException } from "@nestjs/common"
import { ValidationError } from "class-validator"

export class ValidationException extends HttpException {
	constructor(error: ValidationError) {
        super({ message: error.constraints[Object.keys(error.constraints)[0]] }, HttpStatus.BAD_REQUEST)
	}
}