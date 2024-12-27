import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterRequestDTO } from './dto/register/register.request.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterResponseDTO } from './dto/register/register.response.dto';
import { LoginRequestDTO } from './dto/login/login.request.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login/login.response.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerRequestDto: RegisterRequestDTO): Promise<RegisterResponseDTO> {

        registerRequestDto.password = await bcrypt.hash(registerRequestDto.password, 10);
        const user = await this.prisma.user.create({ data: registerRequestDto });

        return new RegisterResponseDTO(user.id);
    }

    async login(loginRequestDto: LoginRequestDTO): Promise<any> {

        const user = await this.prisma.user.findUnique({
            where: { email: loginRequestDto.email }
        });

        if (user && !(await bcrypt.compare(loginRequestDto.password, user.password))) {
            throw new UnauthorizedException;
        }
        
 
        const payload = { uuid: user.id, email: user.email, lastName: user.lastName, firstName: user.firstName, roles: user.role };

        return new LoginResponseDTO(this.jwtService.sign(payload));
    }
}
