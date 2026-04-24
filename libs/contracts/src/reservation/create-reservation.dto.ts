import { IsUUID } from 'class-validator';

export class CreateReservationDto {
    @IsUUID()
    concert_id: string;

    @IsUUID()
    user_id: string;
}