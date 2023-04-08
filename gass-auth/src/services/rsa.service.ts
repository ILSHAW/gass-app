import { privateEncrypt, publicDecrypt } from "crypto"
import { Injectable } from "@nestjs/common"
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class RsaService {
	encrypt(data: string) {
        return privateEncrypt(fs.readFileSync(path.resolve("keys/private.pem")), Buffer.from(data)).toString("hex")
    }
    decrypt(data: string) {
        return publicDecrypt(fs.readFileSync(path.resolve("keys/public.pem")), Buffer.from(data, "hex")).toString()
    }
}