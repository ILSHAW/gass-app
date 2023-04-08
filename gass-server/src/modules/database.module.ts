import { MongooseModule } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { ConfigModule } from "@modules/config.module"
import { UserSchema } from "@schemas/user.schema"

const databaseModule = MongooseModule.forRootAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({ 
		uri: `mongodb://${config.get("database.host")}:${config.get("database.port")}/${config.get("database.name")}`
	})
})
const userDatabaseModule = MongooseModule.forFeature([{ name: "User", schema: UserSchema }])

@Module({
    imports: [databaseModule],
	exports: [databaseModule]
})
export class DatabaseModule {}

@Module({
	imports: [userDatabaseModule],
	exports: [userDatabaseModule]
})
export class UserDatabaseModule {}