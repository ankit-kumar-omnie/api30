import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Api2 {
  id: mongoose.Types.ObjectId;

  @Prop()
  title: string;
}

export const Api2Schema = SchemaFactory.createForClass(Api2);
