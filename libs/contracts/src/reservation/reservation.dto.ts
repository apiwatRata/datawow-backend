import { IsString, IsOptional, IsDate, IsUUID, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../users/user.dto';
import { ConcertDto } from '../concert/concert.dto';

export class ReservationDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsUUID()
    concert_id: string;

    @IsUUID()
    user_id: string;

    @IsOptional()
    @IsString()
    status?: 'active' | 'cancelled';

    @IsOptional()
    @IsDate()
    cancelled_at?: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserDto)
    user?: UserDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ConcertDto)
    concert?: ConcertDto;
}