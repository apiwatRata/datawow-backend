import { Controller, Get, Post, Body, Res, HttpException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(){
    return "Now you can access this protected API";
  }
}
