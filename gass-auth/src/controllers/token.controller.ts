import { Controller, Get, Req, Res, UseGuards, Headers } from "@nestjs/common"
import { ApiHeader, ApiTags, ApiResponse } from "@nestjs/swagger"
import { Request, Response } from "express"

import { TokenService, RefreshDTO } from "@/services/token.service"
import { RefreshGuard } from "@guards/refresh.guard"
import { Role } from "@decorators/role.decorator"
import { RoleGuard } from "@guards/role.guard"

@ApiTags("Token")
@Controller("token")
export class TokenController {
	constructor(private readonly tokenService: TokenService) {}

    @ApiResponse({ status: 401, description: "Refresh token is invalid" })
    @ApiResponse({ status: 400, description: "Invalid request" })
    @ApiResponse({ status: 200, description: "Tokens successfully refreshed" })
    @ApiHeader({ required: true, name: "fingerprint" })
    @Get("refresh")
    @Role(0)
    @UseGuards(RefreshGuard, RoleGuard)
    async refresh(@Req() req: Request, @Res() res: Response, @Headers() headers: RefreshDTO) {
        return await this.tokenService.refresh(req, res, headers)
    }
}