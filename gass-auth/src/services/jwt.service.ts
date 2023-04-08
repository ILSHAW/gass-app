import { Injectable } from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class JwtService {
	access(payload: any) {
        return jwt.sign(payload, fs.readFileSync(path.resolve("keys/private.pem")), { expiresIn: 15*60, algorithm: "RS256" })
    }
    refresh(payload: any) {
        return jwt.sign(payload, fs.readFileSync(path.resolve("keys/private.pem")), { expiresIn: 24*60*60, algorithm: "RS256" })
    }
    confirmation(payload: any) {
        return jwt.sign(payload, fs.readFileSync(path.resolve("keys/private.pem")), { expiresIn: 5*60, algorithm: "RS256" })
    }
}