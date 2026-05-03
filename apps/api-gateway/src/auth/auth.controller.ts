import { Controller, Get, Post, Body, Res, HttpException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Role } from "libs/common/src/enums/roles.enum"
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    });
  }

  
  @Roles([Role.USER, Role.ADMIN])
  @Get('protected')
  getAll(){
    return "Now you can access this protected API";
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

}
