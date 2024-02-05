import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/api.schema";
import { ApiController } from "./controller/api.controller";
import { ApiService } from "./service/api.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, JwtService],
})
export class ApiModule {}
