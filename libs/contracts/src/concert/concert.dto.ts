import { IsOptional, IsString, IsNumber, IsUUID, IsDate, IsArray, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationDto } from '../reservation/reservation.dto';

export class ConcertDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    total_seats: number;

    @IsNumber()
    reserved_seats: number;

    @IsOptional()
    @IsDate()
    event_date?:    Date;
    
    @IsOptional()
    @IsDate()
    deleted_at?: Date;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReservationDto)
    reservations?: ReservationDto[];
}