import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from 'libs/contracts/src/auth/login-response.dto';
import { UserDto } from '../../../../libs/contracts/src/users/user.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ResponseDto } from 'libs/contracts/src/response.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') 
   private authClient: ClientKafka,
   private readonly jwtService: JwtService) {}

  async onModuleInit() {
        const topics = Object.values(KAFKA_TOPICS.AUTH);
        topics.forEach(t => this.authClient.subscribeToResponseOf(t));
        await this.authClient.connect();
  }

  validateLocalUser(email: string, password: string){
    return this.authClient.send<LoginResponseDto>(KAFKA_TOPICS.AUTH.LOGIN, { email, password });
  }

  async login(user: UserDto){
    const { accessToken } = await this.generateTokens(user);
    return {
      user,
      accessToken
    }
  }

  async generateTokens(user: UserDto): Promise<{accessToken: string}>{
    const payload: AuthJwtPayload = { sub: user};
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload)
    ]);

    return {
      accessToken
    }
  }

  validateJwtUser(userId: string){
    return this.authClient.send<ResponseDto>(KAFKA_TOPICS.AUTH.VERIFY, { userId });
  }
}
