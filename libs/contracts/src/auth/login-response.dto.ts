import { UserDto } from "../users/user.dto";
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class LoginResponseDto {
    @IsString()
    status: string;

    @IsNumber()
    status_code: number;

    @IsString()
    message: string;

    user?: UserDto;
    
    @IsOptional()
    @IsString()
    access_token?: string;
}
