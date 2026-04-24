import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Concert } from './entities/concert.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'admin',
          password: 'p@ssw0rd',
          database: 'datawow',
          logging: false,
          models: [Concert],
        }),
        SequelizeModule.forFeature([Concert]),
      ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
