import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../dto/api.dto";

export const UserRoles = (...roles: UserRole[]) => SetMetadata("roles", roles);