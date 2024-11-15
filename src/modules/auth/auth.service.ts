import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }

    async logUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: {email: loginDto.email}});
        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
