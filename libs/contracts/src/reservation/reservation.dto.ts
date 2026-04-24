import { IsString, IsOptional, IsDate, IsUUID } from 'class-validator';

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
}