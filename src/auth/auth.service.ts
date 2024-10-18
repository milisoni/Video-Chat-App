import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    // Registration Logic
    async register(username: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            username,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    // Validate User Logic
    async validateUser(username: string, password: string): Promise<User | null> {
        console.log('Validating user:', username);
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            console.log('User not found');  // User is not found
            return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        return isValidPassword ? user : null;


    }
    // Login Logic
    async login(user: User): Promise<{ access_token: string; userId: number }> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            userId: user.id,
        };
    }

    async validateUserById(userId: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id: userId } });
    }

}
