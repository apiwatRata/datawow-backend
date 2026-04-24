import { IsOptional, IsString, IsNumber, IsUUID, IsDate } from 'class-validator';

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
}