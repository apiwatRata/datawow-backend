import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class GetConcertDto {
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
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    total_seats?: number;

    @IsOptional()
    @IsNumber()
    reserved_seats?: number;

    @IsOptional()
    @IsDate()
    event_date?:    Date;

    @IsOptional()
    @IsDate()
    deleted_at?: Date;

    @IsOptional()
    @IsString()
    order_by?: string;

    @IsOptional()
    @IsString()
    order_direction?: 'asc' | 'desc';
}