
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ErrorMessage } from 'libs/common/src/enums/error_message.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try{
        const request = context.switchToHttp().getRequest();
        const payload = request['user'];
        if(payload && payload.role === 'ADMIN')
            return true;
        else
            throw new HttpException(ErrorMessage.FORBIDDEN, ResponseCode.FORBIDDEN);
    }catch(err){
        if (err instanceof HttpException) {
            throw err;
        }

        throw new HttpException(
            ErrorMessage.INTERNAL_SERVER_ERROR,
            ResponseCode.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
