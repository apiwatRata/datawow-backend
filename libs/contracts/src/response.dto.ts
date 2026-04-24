import { UserDto } from "./users/user.dto";
import { ConcertDto } from "./concert/concert.dto";
import { ReservationDto } from "./reservation/reservation.dto";
import { IsString, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class ResponseDto{
    
    @IsString()
    status: string;

    @IsNumber() 
    status_code: number;

    @IsString()
    message: string;

    @IsOptional()
    data?: UserDto[] | ConcertDto[] | ReservationDto[] 
    ;
    @IsOptional()
    meta?: {
        @IsBoolean()
        cache_hit: boolean;

        @IsDate()
        generated_at: Date;

        @IsNumber()
        total_count: number;
    };
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    page_size?: number;

    @IsOptional()
    @IsNumber()
    total_pages?: number;
}
