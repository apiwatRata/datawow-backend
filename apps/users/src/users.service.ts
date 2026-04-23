import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from 'libs/contracts/src/users/register.dto';
import { UserDto } from 'libs/contracts/src/users/user.dto';
import { User } from './entities/user.entity';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';
import { ResponseDto } from 'libs/contracts/src/response.dto';
import { genSalt, hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(registerDto: RegisterDto): Promise<ResponseDto> {
    const user_exists = await this.userModel.findOne({ where: { email: registerDto.email } });
    if (user_exists) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ResponseMessage.INVALID_PARAMETER };
    }
    const salt = await genSalt(10);
    const password_hash = await hash(registerDto.password, salt);

    let user = await this.userModel.create({ email: registerDto.email, password_hash: password_hash });
    user = user.toJSON();
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [{ id: user.id, email: user.email, role: user.role }] };
  }
}
