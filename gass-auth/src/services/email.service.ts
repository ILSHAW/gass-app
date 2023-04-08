import { MailerService } from "@nestjs-modules/mailer"
import { InjectModel } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { JwtService } from "@services/jwt.service"
import { IUserModel } from "@/models/user.model"

export class SendBodyDTO {
	@ApiProperty({ description: "User email", type: String, example: "pe4enka519@gmail.com" })
	login: string
}
export class ConfirmQueryDTO {
	@ApiProperty({ description: "Confirmation token", type: String, example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." })
	token: string
}

@Injectable()
export class EmailService {
	constructor(@InjectModel("User") private readonly userModel: IUserModel, private readonly mailerService: MailerService, private readonly jwtService: JwtService) {}

	async send(req: Request, res: Response) {
		const email = await this.mailerService.sendMail({
            to: req.user.login,
            subject: "Confirmation",
            template: "./confirmation",
            context: {
                url: `http://localhost:8080/email/confirm?token=${this.jwtService.confirmation({ id: req.user.id })}`
            }
        })

		return res.status(200).send({ message: "Confirmation link sent" })
	}
	async confirm(req: Request, res: Response) {
		await req.user.updateOne({ verified: true })

		return res.status(200).send({ message: "User successfully verified" })
	}
}