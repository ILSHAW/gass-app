import { ApiProperty } from "@nestjs/swagger"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { JwtService } from "@services/jwt.service"
import { RsaService } from "@services/rsa.service"

export class RefreshDTO {
    @ApiProperty({ description: "Application fingerprint", type: String, example: "123456" })
    fingerprint: string
}

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService, private readonly rsaService: RsaService) {}

    async refresh(req: Request, res: Response, headers: RefreshDTO) {
        res.cookie("access", this.jwtService.access({ id: req.user.id }), { maxAge: 15*60*1000 })
        res.cookie("refresh", this.jwtService.refresh({ id: req.user.id, fingerprint: this.rsaService.encrypt(headers.fingerprint) }), { maxAge: 24*60*60*1000 })

        return res.status(200).send({ message: "Tokens successfully refreshed" })
    }
}