import { Injectable, Inject, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import type { ConfigType } from '@nestjs/config';
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { firstValueFrom } from 'rxjs';
import { AuthService } from "../auth.service";
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';
import refreshConfig from "../config/refresh.config";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-jwt"){
    constructor(
        @Inject(refreshConfig.KEY) 
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
    private authService : AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
            secretOrKey: String(refreshTokenConfig.secret),
            ignoreExpiration: false,
        })
    }

    async validate(payload: AuthJwtPayload){
        try{
            const user = payload.sub;
            const result = await firstValueFrom(this.authService.validateRefreshToken(user.id));
            if(result.status === 'error') {
                throw new HttpException(result.message, result.status_code);
            }
            return result.data?.[0];
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