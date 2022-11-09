import { Injectable, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
    }
    
    signup(){
        return 'post auth page';
    }
    signin(){
        return 'get auth page';
    }
    async login(@Req() req, @Res() res){
        const payload = {
            id: req.user.id,
            username: req.user.username,
            full_name: req.user.full_name,
            avatar: req.user.avatar,
            first_time: true,
        };
        // const secret = this.config.get('JWT_SECRET');
        // const access_token = await this.jwt.sign(payload, {
        //     expiresIn : '15m',
        //     secret : secret,
        // });
        const access_token = await this.jwt.sign(payload);
        res.cookie('access_token', access_token, { httpOnly: true });
        res.redirect('/auth/test');
    }
}