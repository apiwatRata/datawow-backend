import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsNumber()
    total_seats: number;
    
    @IsDate()
    event_date:    Date;

    @IsOptional()
    @IsDate()
    deleted_at?: Date;
}