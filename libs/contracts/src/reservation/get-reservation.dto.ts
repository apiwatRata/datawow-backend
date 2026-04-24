import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class GetReservationDto {
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;

    @IsOptional()
    @IsUUID()

    id?: string;

    @IsOptional()
    @IsUUID()
    concert_id?: string;

    @IsOptional()
    @IsUUID()
    user_id?: string;

    @IsOptional()
    @IsString()
    status?: 'active' | 'cancelled';

    @IsOptional()
    @IsDate()
    cancelled_at?: Date;

    @IsOptional()
    @IsString()
    order_by?: string;

    @IsOptional()
    @IsString()
    order_direction?: 'asc' | 'desc';
}