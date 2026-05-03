import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '../../../libs/contracts/src/kafka.topics';
import { LoginAuthDto } from '../../../libs/contracts/src/auth/login-auth.dto';
import { LoginResponseDto } from '../../../libs/contracts/src/auth/login-response.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KAFKA_TOPICS.AUTH.LOGIN)
  login(data: LoginAuthDto): Promise<LoginResponseDto> {
    return this.authService.login(data);
  }

  @MessagePattern(KAFKA_TOPICS.AUTH.VERIFY)
  validateJwtUser({ userId } : { userId: string}): Promise<ResponseDto>{
    return this.authService.validateJwtUser(userId);
  }
}
