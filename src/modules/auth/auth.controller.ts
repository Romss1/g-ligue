import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
) {}

  @Post('register')
  @HttpCode(204)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.authService.createUser(createUserDto);

    return res.send({ message: 'You\'\re register'});
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.logUser(loginDto);
    if (user) {
      const token = this.authService.getToken(user);
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });

      return res.send({ message: 'Login successful' });
    }

    throw new UnauthorizedException();
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('authToken');

    return res.send({ message: 'Logout successful' });
  }
}
