import { Controller, Req, Res, UseGuards, Get } from "@nestjs/common"
import { ApiTags, ApiCookieAuth, ApiResponse } from "@nestjs/swagger"
import { Request, Response } from "express"

import { UserService } from "@services/user.service"
import { AccessGuard } from "@guards/access.guard"
import { Role } from "@decorators/role.decorator"
import { RoleGuard } from "@guards/role.guard"

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({ status: 400, description: "Invalid request" })
    @ApiResponse({ status: 200, description: "Information about user" })
    @ApiCookieAuth("access")
    @Get("")
    @Role(0)
    @UseGuards(AccessGuard, RoleGuard)
    async get(@Req() req: Request, @Res() res: Response) {
        return await this.userService.get(req, res)
    }
}