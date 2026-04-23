import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../users/src/entities/user.entity';
import { compare } from 'bcrypt';
import { LoginAuthDto } from '../../../libs/contracts/src/auth/login-auth.dto';
import { LoginResponseDto } from '../../../libs/contracts/src/auth/login-response.dto';
import { ResponseCode } from '../../../libs/common/src/enums/response_code.enum';
import { ErrorMessage } from '../../../libs/common/src/enums/error_message.enum';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
   
  async login(data: LoginAuthDto): Promise<LoginResponseDto> {

    const users = await this.userModel.findAll({ where: { email: data.email } });
    if (users.length === 0) {
      return { status: 'error', status_code: ResponseCode.NOT_FOUND, message: ErrorMessage.USER_NOT_FOUND };
    }
    const user = users[0].toJSON();
    const isPasswordValid = await compare(data.password, user.password_hash);
    if (!isPasswordValid) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ErrorMessage.INVALID_PARAMETER } ;
    }

    return { status: 'success', status_code: 200, message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } };
  }
}
