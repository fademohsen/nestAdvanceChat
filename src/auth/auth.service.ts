import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        
        ) {}
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = user._doc ;
        return {
            user : user._doc,
            access_token: this.jwtService.sign(payload),
        };
    }
    async getUserFromAuthenticationToken(token: string) {
        const payload = this.jwtService.verify(token);
        return await this.usersService.findOne(payload.email);
    }
    
}
