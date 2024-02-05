import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Api2, Api2Schema } from "./schema/api2.schema";
import { Api2Controller } from "./controller/api2.controller";
import { Api2Service } from "./service/api2.service";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "src/api/guards/role.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Api2.name, schema: Api2Schema }]),
  ],
  controllers: [Api2Controller],
  providers: [Api2Service, JwtService, RolesGuard],
})
export class Api2Module {}
