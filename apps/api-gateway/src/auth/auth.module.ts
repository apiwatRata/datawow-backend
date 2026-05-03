import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './auth-role.guard';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshConfig from './config/refresh.config';
@Module({
  imports:[
      ClientsModule.register([
        {
          name: 'AUTH_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'auth',
              brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            },
            consumer: {
              groupId: 'auth-consumer',
            }
          },
        },
      ]),
      JwtModule.registerAsync(jwtConfig.asProvider()),
      ConfigModule.forFeature(jwtConfig),
      ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AdminGuard, LocalStrategy, JwtStrategy],
  exports: [AuthGuard, AdminGuard, JwtModule]
})
export class AuthModule {}
