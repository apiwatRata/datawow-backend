import { UserDto } from "../users/user.dto";

export class LoginResponseDto {
    status: string;
    status_code: number;
    message: string;
    user?: UserDto;
    access_token?: string;
}
