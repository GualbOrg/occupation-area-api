import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { LinkouException } from "../exception/linkou.exception";


import { Permission } from "./permission.enum";

import { PUBLIC_OPERATION_KEY } from "./public.decorator";
import { CHECK_PERMISSIONS_KEY } from "./required-permissions.decorator";
import { AUTHORIZATION_WITHOUT_PERMISSIONS } from "./authorization-without-permissions.decorator";
import { AuthErrors } from "./error/auth.errors";
import { Profile } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("______________CC")

        const isPublicOperation = this.reflector.get<boolean>(
            PUBLIC_OPERATION_KEY,
            context.getHandler()
        );

        const authorizationWithoutPermissions = this.reflector.get<boolean>(
            AUTHORIZATION_WITHOUT_PERMISSIONS,
            context.getHandler()
        );

        if (isPublicOperation) {
            return true;
        }
        if (authorizationWithoutPermissions) {
            return true;
        }

        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
            CHECK_PERMISSIONS_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        const gqlContext = GqlExecutionContext.create(context);
        const userId = gqlContext.getContext().req.user.sub;

        const user = await this.getUserById(userId);

        if (!user) {
            throw new LinkouException(AuthErrors.AUTH_USER_NOT_REGISTRED)
        }

        const userPermissions = await this.getUserPermissionsById(userId);

        this.injectUserPermissionIntoContext(gqlContext, userPermissions);

        if (!requiredPermissions) {
            return true;
        }

        return requiredPermissions.some(permission => userPermissions.includes(permission));
    }

    private async getUserById(userId: string): Promise<Profile | null> {
        const profile = await this.prisma.profile.findUnique({ where: { id: userId } })
        return profile;
    }

    private async getUserPermissionsById(userId: string): Promise<string[]> {
        const profile = await this.prisma.profile.findUnique({ where: { id: userId } }) as Profile
        return [profile.role]
    }

    private injectUserPermissionIntoContext(gqlContext: GqlExecutionContext, userPermissions: string[]): void {
        gqlContext.getContext().req['userPermissions'] = userPermissions;
    }

}