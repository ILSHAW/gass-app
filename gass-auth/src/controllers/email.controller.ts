import { Controller, Req, Res, Get, UseGuards, Post, Body } from "@nestjs/common"
import { ApiBody, ApiQuery, ApiTags, ApiResponse } from "@nestjs/swagger"
import { Request, Response } from "express"

import { EmailService, SendBodyDTO, ConfirmQueryDTO } from "@/services/email.service"
import { ConfirmGuard } from "@guards/confirm.guard"
import { Role } from "@decorators/role.decorator"
import { SendGuard } from "@guards/send.guard"
import { RoleGuard } from "@guards/role.guard"

@ApiTags("Email")
@Controller("email")
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@ApiResponse({ status: 400, description: "Invalid request" })
	@ApiResponse({ status: 200, description: "Confirmation link sent" })
	@ApiBody({ type: SendBodyDTO, required: true })
	@Post("confirm")
	@Role(0)
	@UseGuards(SendGuard, RoleGuard)
	async send(@Req() req: Request, @Res() res: Response) {
		this.emailService.send(req, res)
	}
	@ApiResponse({ status: 400, description: "Invalid request" })
	@ApiResponse({ status: 200, description: "User successfully verified" })
	@ApiQuery({ type: ConfirmQueryDTO, required: true })
	@Get("confirm")
	@Role(0)
	@UseGuards(ConfirmGuard, RoleGuard)
	async confirm(@Req() req: Request, @Res() res: Response) {
		this.emailService.confirm(req, res)
	}
}