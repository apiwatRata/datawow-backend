import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientKafka) {}

  async onModuleInit() {
        const topics = Object.values(KAFKA_TOPICS.USERS);
        topics.forEach(t => this.usersClient.subscribeToResponseOf(t));
        await this.usersClient.connect();
  }

  findAll() {
    return this.usersClient.send<UserDto>(KAFKA_TOPICS.USERS.FIND_ALL, {});
  }

  register(registerDto: RegisterDto) {
    return this.usersClient.send<UserDto>(KAFKA_TOPICS.USERS.REGISTER, registerDto);
  }
}
