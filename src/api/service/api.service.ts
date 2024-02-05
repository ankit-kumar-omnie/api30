import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/api.schema";
import mongoose, { Model } from "mongoose";
import { ApiDto } from "../dto/api.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name) private usermodel: Model<User>,
    private jwtservice: JwtService
  ) {}

  async createuser(dto: ApiDto) {
    const { username, password, role } = dto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const usercreation = await this.usermodel.create({
      username,
      password: hashedpassword,
      role,
    });
    if (!usercreation) {
      throw new BadRequestException(`Error,Something is wrong`);
    }
    return usercreation;
  }

  async getall(): Promise<User[]> {
    const getusers = await this.usermodel.find({}, { password: 0 });
    if (!getusers) {
      throw new BadRequestException(`User not found`);
    }
    return getusers;
  }

  async getbyid(id: mongoose.Types.ObjectId) {
    const getuser = await this.usermodel.findById(id, { password: 0 });
    if (!getuser) {
      throw new BadRequestException(`User not found`);
    }
    return getuser;
  }

  async updatebyid(id: mongoose.Types.ObjectId, dto: ApiDto) {
    const updateuser = await this.usermodel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updateuser) {
      throw new BadRequestException(`Please enter correct details`);
    }
    return updateuser;
  }

  async deletebyid(id: mongoose.Types.ObjectId) {
    const deleteuser = await this.usermodel.findByIdAndDelete(id);
    if (!deleteuser) {
      throw new BadRequestException(`Invalid Details`);
    }
    return { message: "User Deleted" };
  }

  async getuserbyusername(username: string) {
    return await this.usermodel.findOne({ username });
  }

  async signin(username: string, password: string) {
    const userinfo = await this.getuserbyusername(username);
    if (!userinfo) {
      throw new UnauthorizedException(`User not found`);
    }

    const comparepassword = await bcrypt.compare(password, userinfo.password);
    if (!comparepassword) {
      throw new UnauthorizedException(`Password does not matched`);
    }

    const payload = {
      sub: userinfo.id,
      role: userinfo.role,
    };

    const accessToken = this.jwtservice.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });

    return { accessToken };
  }
}
