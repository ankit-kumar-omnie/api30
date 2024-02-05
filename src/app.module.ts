import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiModule } from "./api/api.module";
import { Api2Module } from "./api2/api2.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ApiModule,
    Api2Module,
  ],
})
export class AppModule {}
