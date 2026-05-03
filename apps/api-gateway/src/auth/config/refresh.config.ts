import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { jwtConstants } from 'libs/contracts/src/auth/constants';

export default registerAs(
    'refresh-jwt',
    (): JwtSignOptions => ({
        secret: jwtConstants.refresh_secret,
        expiresIn: jwtConstants.refresh_expire as any
    })
)