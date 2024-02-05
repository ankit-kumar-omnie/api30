import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiService } from "../service/api.service";
import { ApiDto } from "../dto/api.dto";
import mongoose from "mongoose";
import { SigninDto } from "../dto/signin.dto";

@Controller("api")
export class ApiController {
  constructor(private apiservice: ApiService) {}

  @Post("create")
  async create(@Body() dto: ApiDto) {
    try {
      return await this.apiservice.createuser(dto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @Get()
  async getusers() {
    try {
      return await this.apiservice.getall();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(":id")
  async getbyid(@Param("id") id: mongoose.Types.ObjectId) {
    try {
      return await this.apiservice.getbyid(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") id: mongoose.Types.ObjectId,
    @Body() dto: ApiDto
  ) {
    try {
      return await this.apiservice.updatebyid(id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") id: mongoose.Types.ObjectId) {
    try {
      return await this.apiservice.deletebyid(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("sign")
  async signin(@Body() dto: SigninDto) {
    try {
      return await this.apiservice.signin(dto.username, dto.password);
    } catch (error) {
      throw new UnauthorizedException(`Invalid Details`);
    }
  }
}
