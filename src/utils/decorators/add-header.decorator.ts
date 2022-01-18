import { createParamDecorator, ExecutionContext, ParseIntPipe } from "@nestjs/common";

export enum transformToTypeTypes {
    INT = 'int'
}

export interface IAddParamsToBodyArgs {
    paramName: string,
    transformTo?: transformToTypeTypes
}

export const AddHeaderToBody = createParamDecorator ((args: IAddParamsToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    // let value = req.query[args.paramName];
    let value = req.headers.authorization;

   if(args.transformTo === transformToTypeTypes.INT)
        value = parseInt(value);

    req.body[args.paramName] = value;

    return req;
});