import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from 'libs/contracts/src/auth/login-response.dto';
import { UserDto } from '../../../../libs/contracts/src/users/user.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientKafka, private readonly jwtService: JwtService) {}

  async onModuleInit() {
        const topics = Object.values(KAFKA_TOPICS.AUTH);
        topics.forEach(t => this.authClient.subscribeToResponseOf(t));
        await this.authClient.connect();
  }

  login(loginAuthDto: LoginAuthDto) {
    return this.authClient.send<LoginResponseDto>(KAFKA_TOPICS.AUTH.LOGIN, loginAuthDto);
  }

  async generateToken(payload?: UserDto) : Promise<String>{
    if(!payload) return '';
    return await this.jwtService.signAsync(payload)
  }
}
