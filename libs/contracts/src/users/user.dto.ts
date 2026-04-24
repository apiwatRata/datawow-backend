import { IsString, IsUUID, IsOptional } from 'class-validator';
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
}