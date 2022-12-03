import { Permission } from "./permission.enum";
import { SetMetadata } from "@nestjs/common";

export const CHECK_PERMISSIONS_KEY = 'check_permissions';
export const RequiredPermissions = (...handlers: Permission[]) => SetMetadata(CHECK_PERMISSIONS_KEY, handlers);
