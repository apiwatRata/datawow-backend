import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { jwtConstants } from 'libs/contracts/src/auth/constants';

export default registerAs("jwt", (): JwtModuleOptions =>({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expire as any },
}))