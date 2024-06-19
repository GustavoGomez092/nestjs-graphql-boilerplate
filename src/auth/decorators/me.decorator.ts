import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// This decorator is used to get the user object from the request object
// It requires the query to NOT be public for it to work
export const Me = createParamDecorator((data, req) => {
  const ctx = GqlExecutionContext.create(req);
  return ctx.getContext().req.user;
});
