import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";

@Injectable ({})
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private prisma: PrismaService, config: ConfigService){
        super({
            clientID: config.get('CLIENT_ID'),
            clientSecret: config.get('CLIENT_SECRET'),
            callbackURL: config.get('CALLBACK_URL'),
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) : Promise<any> {
        const user = await this.prisma.user.create({
            data : {
                id: profile.id,
                full_name: profile.displayName,
                avatar: profile.photos[0].value,
            }
        });
        this.generate_jwt_token(user);
    }
    async generate_jwt_token(user: User){
        
    }
    
}