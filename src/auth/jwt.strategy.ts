import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity'; // Adjust the path as necessary
import { AuthService } from './auth.service'; // Adjust the path as necessary

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey', // Use the same secret key used for signing the token
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUserById(payload.sub);
        return user; // Return user data if valid
    }
}
