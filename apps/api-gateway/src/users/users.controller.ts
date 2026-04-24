import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'libs/contracts/src/users/register.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/auth-role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard,AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

}
