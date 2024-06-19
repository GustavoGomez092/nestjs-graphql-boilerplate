import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({ usernameField: 'email' });
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    if (gqlReq) {
      gqlReq.body = ctx.getArgs();
      return gqlReq;
    }
    return context.switchToHttp().getRequest();
  }
}
