import { Controller, Post, Req, Res, Get, UseGuards, Body, Headers } from "@nestjs/common"
import { ApiBody, ApiHeader, ApiTags, ApiResponse, ApiCookieAuth } from "@nestjs/swagger"
import { Request, Response } from "express"

import { AuthService, SignupBodyDTO, LoginHeadersDTO, LoginBodyDTO } from "@services/auth.service"
import { SignupGuard } from "@guards/signup.guard"
import { AccessGuard } from "@guards/access.guard"
import { Role } from "@decorators/role.decorator"
import { LoginGuard } from "@guards/login.guard"
import { RoleGuard } from "@guards/role.guard"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

    @ApiResponse({ status: 400, description: "Invalid request" })
    @ApiResponse({ status: 409, description: "Login already taken" })
    @ApiResponse({ status: 201, description: "User successfully created" })
    @ApiBody({ type: SignupBodyDTO, required: true })
    @Post("signup")
    @UseGuards(SignupGuard)
    async signup(@Req() req: Request, @Res() res: Response, @Body() body: SignupBodyDTO) {
        return await this.authService.signup(req, res, body)
    }
    @ApiResponse({ status: 400, description: "Invalid request" })
    @ApiResponse({ status: 403, description: "Bad password / User not verified" })
    @ApiResponse({ status: 404, description: "User not found" })
    @ApiResponse({ status: 200, description: "User successfully authenticated" })
    @ApiHeader({ required: true, name: "fingerprint" })
    @ApiBody({ type: LoginBodyDTO })
    @Post("login")
    @Role(0)
    @UseGuards(LoginGuard, RoleGuard)
    async login(@Req() req: Request, @Res() res: Response, @Headers() headers: LoginHeadersDTO) {
        return await this.authService.login(req, res, headers)
    }
    @ApiCookieAuth("access")
    @ApiResponse({ status: 400, description: "Invalid request" })
    @ApiResponse({ status: 200, description: "User successfully logged out" })
    @Get("logout")
    @Role(0)
    @UseGuards(AccessGuard, RoleGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}