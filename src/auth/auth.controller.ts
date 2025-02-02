import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDTO } from './dto/register/register.request.dto';
import { AuthService } from './auth.service';
import { RegisterResponseDTO } from './dto/register/register.response.dto';
import { LoginRequestDTO } from './dto/login/login.request.dto';
import { LoginResponseDTO } from './dto/login/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerRequestDto: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return this.authService.register(registerRequestDto);
  }

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDTO,
  ): Promise<LoginResponseDTO> {
    return this.authService.login(loginRequestDto);
  }
}
