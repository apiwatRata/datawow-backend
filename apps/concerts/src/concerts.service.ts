import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Concert } from './entities/concert.entity';
import { GetConcertDto } from 'libs/contracts/src/concert/get-concert.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';
import { ResponseCode } from 'libs/common/src/enums/response_code.enum';
import { ResponseMessage } from 'libs/common/src/enums/response_message.enum';
import { Op } from 'sequelize';
import { CreateConcertDto } from 'libs/contracts/src/concert/create-concert.dto';
import { ConcertDto } from 'libs/contracts/src/concert/concert.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ConcertsService {
  constructor(@InjectModel(Concert) private concertModel: typeof Concert) {}

  async getAllConcerts(filter: GetConcertDto): Promise<ResponseDto> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const order_by = filter.order_by || 'created_at';
    const order_direction = filter.order_direction || 'DESC';
    const concerts = await this.concertModel.findAll({
      attributes: ['id', 'name', 'description', 'total_seats', 'reserved_seats', 'event_date'],
      where:{ deleted_at: {
        [Op.is]: null
      } },
      limit,
      offset,
      order: [[order_by, order_direction]],
      raw: true,
    });
    if (concerts.length === 0) {
          return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [] };
    }
    const concertDtos = plainToInstance(ConcertDto, concerts);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: concertDtos };
  }

  async getConcertById(id: string): Promise<ResponseDto> {
    let concert = await this.concertModel.findByPk(id,{
      attributes: ['id', 'name', 'description', 'total_seats', 'reserved_seats', 'event_date']
    });
    if (!concert) {
          return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [] };
    }
    const concertDtos = plainToInstance(ConcertDto, concert);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [concertDtos] };
  }

  async createConcert(concertDto: CreateConcertDto): Promise<ResponseDto> {
    const concert_exists = await this.concertModel.findOne({ where: { name: concertDto.name } });
    if (concert_exists) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ResponseMessage.INVALID_PARAMETER };
    }
    let concert = await this.concertModel.create(concertDto);
    const concertDtos = plainToInstance(ConcertDto, concert);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [concertDtos] };
  }

  async deleteConcert(id: string): Promise<ResponseDto> {
    let concert = await this.concertModel.update({ deleted_at: new Date() }, { where: { id, deleted_at: { [Op.is]: null } } });
    if (concert['affectedCount'] === 0) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ResponseMessage.INVALID_PARAMETER };
    }
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [] };
  }

  async updateConcert(id: string, concertDto: ConcertDto): Promise<ResponseDto> {
    let concert = await this.concertModel.update(concertDto, { where: { id } });
    if (concert['affectedCount'] === 0) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ResponseMessage.INVALID_PARAMETER };
    }
    let updated_concert = await this.concertModel.findByPk(id,{
      attributes: ['id', 'name', 'description', 'total_seats', 'reserved_seats', 'event_date']
    });
    if (!updated_concert) {
      return { status: 'error', status_code: ResponseCode.BAD_REQUEST, message: ResponseMessage.INVALID_PARAMETER };
    }
    const concertDtos = plainToInstance(ConcertDto, updated_concert);
    return { status: 'success', status_code: ResponseCode.SUCCESS, message: ResponseMessage.SUCCESS, data: [concertDtos] };
  }
}
