import { Controller, Request, Post, UseGuards , Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from "./auth/decorator/public.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService ,private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.email, req.body.password);
    return this.authService.login(user);
  }
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
