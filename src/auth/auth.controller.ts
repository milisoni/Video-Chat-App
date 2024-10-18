import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
      @Body('username') username: string,
      @Body('password') password: string,
    ): Promise<User> {
      return this.authService.register(username, password);
    }
  
    @Post('login')
    async login(
      @Body('username') username: string,
      @Body('password') password: string,
    ): Promise<{ access_token: string }> {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    }
}
