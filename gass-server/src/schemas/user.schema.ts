import { Document, Schema } from "mongoose"

interface IUser {
    name: string
    surname: string
    login: string
    password: string
    role: number
    verified: boolean
}
export interface IUserDocument extends IUser, Document {}

export const UserSchema = new Schema<IUserDocument>({
    name: { type: Schema.Types.String },
    surname: { type: Schema.Types.String },
    login: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    role: { type: Schema.Types.Number, default: 0 },
    verified: { type: Schema.Types.Boolean, default: false }
})