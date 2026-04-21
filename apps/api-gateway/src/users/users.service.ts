import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientKafka) {}

  async onModuleInit() {
        const topics = Object.values(KAFKA_TOPICS.USERS);
        topics.forEach(t => this.usersClient.subscribeToResponseOf(t));
        await this.usersClient.connect();
  }

  findAll() {
    return this.usersClient.send<UserDto>('users.findAll', {});
  }
}
