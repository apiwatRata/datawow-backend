export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? '!development!',
  expire: process.env.JWT_EXPIRES_IN ?? '60s',
  refresh_secret: process.env.REFRESH_JWT_SECRET ?? '!!developmentRefresh!!',
  refresh_expire: process.env.REFRESH_JWT_EXPIRES_IN  ?? '7d',
};