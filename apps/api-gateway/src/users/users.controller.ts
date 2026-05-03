import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'libs/contracts/src/users/register.dto';
import { Role } from "libs/common/src/enums/roles.enum"
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([Role.ADMIN])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

}
