import { Injectable, Inject, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import type { ConfigType } from '@nestjs/config';
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { firstValueFrom } from 'rxjs';
import { AuthService } from "../auth.service";
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(jwtConfig.KEY) 
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authService : AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: String(jwtConfiguration.secret),
            ignoreExpiration: false,
        })
    }

    async validate(payload: AuthJwtPayload){
        try{
            const user = payload.sub;
            const result = await firstValueFrom(this.authService.validateJwtUser(user.id));
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