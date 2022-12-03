import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_OPERATION_KEY } from './public.decorator';


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(

        private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        console.log(this.getRequest(context)['headers'])
        const isPublicOperation = this.reflector.get<boolean>(
            PUBLIC_OPERATION_KEY,
            context.getHandler()
        );

        if (isPublicOperation) {
            return true;
        }

        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
