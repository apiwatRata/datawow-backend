import { UserDto } from "../users/user.dto";

export class LoginResponseDto {
    status: String;
    status_code: number;
    message: String;
    user?: UserDto;
    access_token?: String;
}
