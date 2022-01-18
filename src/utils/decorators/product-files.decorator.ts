import { createParamDecorator, ExecutionContext, ParseIntPipe } from "@nestjs/common";


export interface IAddFilesToBodyArgs {
    paramName: Array<string>,
}

export const AddFilesToBody = createParamDecorator ((args: IAddFilesToBodyArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    args.paramName.forEach(param => {
        if(req.files[param]) req.body[param] = req.files[param][0].path
        console.log(req.files[param][0].path)
        // if(req.files[param]) req.body[param] = req.files[param][0].filename
    })

    return req;
});