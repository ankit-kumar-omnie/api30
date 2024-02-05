import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Api2 } from "../schema/api2.schema";
import { Model } from "mongoose";
import { Api2Dto } from "../dto/api2.dto";

@Injectable()
export class Api2Service {
  constructor(@InjectModel(Api2.name) private api2model: Model<Api2>) {}

  async createpost(dto: Api2Dto) {
    const creation = await this.api2model.create(dto);
    if (!creation) {
      throw new BadRequestException(`Post not Created`);
    }
    return creation;
  }
}
