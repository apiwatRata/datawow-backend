import { UserDto } from "libs/contracts/src/users/user.dto";

export type AuthJwtPayload = {
    sub: UserDto;
};