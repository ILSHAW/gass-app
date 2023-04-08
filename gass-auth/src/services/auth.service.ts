import { MailerService } from "@nestjs-modules/mailer"
import { InjectModel } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import * as argon from "argon2"

import { JwtService } from "@services/jwt.service"
import { RsaService } from "@services/rsa.service"
import { IUserModel } from "@/models/user.model"

export class SignupBodyDTO {
    @ApiProperty({ description: "User name", type: String, example: "Andrey" })
    name: string
    @ApiProperty({ description: "User Surname", type: String, example: "Neyzhmak" })
    surname: string
    @ApiProperty({ description: "User email", type: String, example: "pe4enka519@gmail.com" })
    login: string
    @ApiProperty({ description: "User password", type: String, example: "123456" })
    password: string
}
export class LoginHeadersDTO {
    @ApiProperty({ description: "Application fingerprint", type: String, example: "123456" })
    fingerprint: string
}
export class LoginBodyDTO {
    @ApiProperty({ description: "User email", type: String, example: "pe4enka519@gmail.com" })
    login: string
    @ApiProperty({ description: "User password", type: String, example: "123456" })
    password: string
}

@Injectable()
export class AuthService {
	constructor(@InjectModel("User") private readonly userModel: IUserModel, private readonly mailerService: MailerService, private readonly jwtService: JwtService, private readonly rsaService: RsaService) {}

	async signup(req: Request, res: Response, body: SignupBodyDTO) {
        const user = await this.userModel.create({
            name: body.name,
            surname: body.surname,
            login: body.login,
            password: await argon.hash(body.password)
        })

        const email = await this.mailerService.sendMail({
            to: user.login,
            subject: "Confirmation",
            template: "./confirmation",
            context: {
                url: `http://localhost:8080/email/confirm?token=${this.jwtService.confirmation({ id: user.id })}`
            }
        })

        return res.status(201).send({ message: "User successfully created" })
	}
    async login(req: Request, res: Response, headers: LoginHeadersDTO) {
        res.cookie("access", this.jwtService.access({ id: req.user.id }), { maxAge: 15*60*1000 })
        res.cookie("refresh", this.jwtService.refresh({ id: req.user.id, fingerprint: this.rsaService.encrypt(headers.fingerprint) }), { maxAge: 24*60*60*1000 })

        return res.status(200).send({ message: "User successfully authenticated" })
    }
    async logout(req: Request, res: Response) {
        res.clearCookie("access")
        res.clearCookie("refresh")

        return res.status(200).send({ message: "User successfully logged out" })
    }
}