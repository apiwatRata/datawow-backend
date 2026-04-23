import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResponseCode } from '../../../libs/common/src/enums/response_code.enum';
import { ErrorMessage } from '../../../libs/common/src/enums/response_message.enum';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthController', () => {
  let authController: AuthController;
  let userModel: any;

  beforeEach(async () => {
    userModel = {
      findAll: jest.fn(),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return error if user not found', async () => {
      userModel.findAll.mockResolvedValue([]);
      const result = await authController.login({ email: 'test@example.com', password: '1234' });
      expect(result).toEqual({
        status: 'error',
        status_code: ResponseCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    });

    it('should return error if password is invalid', async () => {
      const fakeUser = { id: 1, email: 'test@example.com', role: 'user', password_hash: 'hashed' };
      userModel.findAll.mockResolvedValue([{ toJSON: () => fakeUser }]);
      (compare as jest.Mock).mockResolvedValue(false);

      const result = await authController.login({ email: 'test@example.com', password: 'wrong' });
      expect(result).toEqual({
        status: 'error',
        status_code: ResponseCode.BAD_REQUEST,
        message: ErrorMessage.INVALID_PARAMETER,
      });
    });

    it('should return success if password is valid', async () => {
      const fakeUser = { id: 1, email: 'test@example.com', role: 'user', password_hash: 'hashed' };
      userModel.findAll.mockResolvedValue([{ toJSON: () => fakeUser }]);
      (compare as jest.Mock).mockResolvedValue(true);

      const result = await authController.login({ email: 'test@example.com', password: 'correct' });
      expect(result).toEqual({
        status: 'success',
        status_code: 200,
        message: 'Login successful',
        user: { id: fakeUser.id, email: fakeUser.email, role: fakeUser.role },
      });
    });
  });
  
});
