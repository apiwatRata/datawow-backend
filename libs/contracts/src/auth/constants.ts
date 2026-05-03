export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? '!development!',
  expire: process.env.JWT_EXPIRES_IN ?? '60s'
};