import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Api2Service } from "../service/api2.service";
import { Api2Dto } from "../dto/api2.dto";
import { AuthGuard } from "src/api/guards/auth.guard";
import { RolesGuard } from "src/api/guards/role.guard";
import { UserRoles } from "src/api/guards/role.decorator";
import { UserRole } from "src/api/dto/api.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class Api2Controller {
  constructor(private api2service: Api2Service) {}

  @UserRoles(UserRole.ADMIN)
  @Post()
  async createpost(@Body() dto: Api2Dto) {
    try {
      return await this.api2service.createpost(dto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }
}
