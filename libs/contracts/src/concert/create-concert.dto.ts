import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateConcertDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsNumber()
    total_seats: number;
    
    @Type(() => Date)
    @IsDate()
    event_date:    Date;

    @IsOptional()
    @IsDate()
    deleted_at?: Date;
}