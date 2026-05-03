import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { firstValueFrom } from 'rxjs';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        try{
            const result = await firstValueFrom(this.authService.validateLocalUser(email, password));
            if(result.status === 'error') {
                throw new HttpException(result.message, result.status_code);
            }
            return result.user;
        } catch(err ){
            if (err instanceof HttpException) {
                throw err;
            }
            throw new HttpException(
                ResponseMessage.INTERNAL_SERVER_ERROR,
                ResponseCode.INTERNAL_SERVER_ERROR,
            );
        };
    }
}