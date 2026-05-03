import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConcertsModule } from './concerts/concerts.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, ConcertsModule, ReservationsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
