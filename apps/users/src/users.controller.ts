import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { KAFKA_TOPICS } from 'libs/contracts/src/kafka.topics';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { RegisterDto } from 'libs/contracts/src/users/register.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(KAFKA_TOPICS.USERS.REGISTER)
  register(registerDto: RegisterDto): Promise<ResponseDto> {
    return this.usersService.register(registerDto);
  }
}
