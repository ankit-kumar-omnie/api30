import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserRole } from "../dto/api.dto";

@Schema({ timestamps: true })
export class User {
  id: mongoose.Types.ObjectId;

  @Prop({unique:true})
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
