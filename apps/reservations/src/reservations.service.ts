import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { GetReservationDto } from 'libs/contracts/src/reservation/get-reservation.dto';
import { CreateReservationDto } from 'libs/contracts/src/reservation/create-reservation.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';
import { plainToInstance } from 'class-transformer';
import { ReservationDto } from 'libs/contracts/src/reservation/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(@InjectModel(Reservation) private reservationModel: typeof Reservation) {}

  async reserve(createReservationDto: CreateReservationDto): Promise<ResponseDto> {
    const check_dup = await this.reservationModel.findOne({ where: { concert_id: createReservationDto.concert_id, user_id: createReservationDto.user_id } });
    if (check_dup) {
      return { status: 'error', status_code: ResponseCode.CONFLICT, message: ResponseMessage.CONFLICT };
    }
    let reserved = await this.reservationModel.create({ concert_id: createReservationDto.concert_id, user_id: createReservationDto.user_id });
    const reservationDto = plainToInstance(ReservationDto, reserved);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [reservationDto] };
  }

  async cancel(reservation_id: string): Promise<ResponseDto> {
    const reserved = await this.reservationModel.findByPk(reservation_id);
    if (!reserved) {
      return { status: 'error', status_code: ResponseCode.NOT_FOUND, message: ResponseMessage.NOT_FOUND };
    }
    await reserved.update({ status: 'cancelled' });
    const reservationDto = plainToInstance(ReservationDto, reserved);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [reservationDto] };
  }

  async getPersonalReservations(user_id: string, filter: GetReservationDto ): Promise<ResponseDto> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const order_by = filter.order_by || 'created_at';
    const order_direction = filter.order_direction || 'DESC';
    const reservations = await this.reservationModel.findAll({
      where: { user_id: user_id },
      limit,
      offset,
      order: [[order_by, order_direction]],
      raw: true,
    });
    if (reservations.length === 0) {
          return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [] };
    }
    const data = plainToInstance(ReservationDto, reservations);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: data };
  }

  async getAllReservations(filter: GetReservationDto): Promise<ResponseDto> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const order_by = filter.order_by || 'created_at';
    const order_direction = filter.order_direction || 'DESC';
    const reservations = await this.reservationModel.findAll({
      limit,
      offset,
      order: [[order_by, order_direction]],
      raw: true,
    });
    if (reservations.length === 0) {
          return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [] };
    }
    const data = plainToInstance(ReservationDto, reservations);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: data };
  } 
}
