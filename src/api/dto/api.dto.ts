import { IsEnum } from "@nestjs/class-validator";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class ApiDto {
  username: string;

  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
