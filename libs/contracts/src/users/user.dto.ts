import { IsString, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationDto } from '../reservation/reservation.dto';

export class UserDto {
    
    @IsUUID()
    id: string;

    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    role?: 'ADMIN' | 'USER';

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReservationDto)
    reservations?: ReservationDto[];
}