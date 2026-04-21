import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../users/src/entities/user.entity';

@Injectable()
export class AuthService {
   constructor(@InjectModel(User) private userModel: typeof User,) {}
   
  getHello(): string {
    return 'Hello World!';
  }
}
