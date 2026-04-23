import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { firstValueFrom } from 'rxjs';
import { ErrorMessage } from 'libs/common/src/enums/error_message.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    let result = firstValueFrom(this.authService.login(loginAuthDto));
    return result.then(res => {
      if (res.status === 'error') {
        throw new HttpException(res.message, res.status_code);
      }
      return this.authService.generateToken(res.user).then(token =>  {
        res.access_token = token;
        return res;
      });
    }).catch(err => {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        ResponseCode.INTERNAL_SERVER_ERROR,
      );
    });
  }

}
