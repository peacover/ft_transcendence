import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { response } from "express";


@Injectable ({})
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
        super({
            clientID: config.get('CLIENT_ID'),
            clientSecret: config.get('CLIENT_SECRET'),
            callbackURL: config.get('CALLBACK_URL'),
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) : Promise<any> {
        // console.log(profile);
        
        const user = await this.prisma.user.create({
            data : {
                id: profile.id,
                username: profile.username,
                full_name: profile.displayName,
                avatar: profile.photos[0].value,
                first_time: true,
            }
        });
        this.signToken(user);
        // console.log(access_token);

    }
    async signToken(user: User){
        const payload = {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            avatar: user.avatar,
            first_time: true,
        };
        const secret = this.config.get('JWT_SECRET');
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn : '15m',
            secret : secret,
        });
        console.log(access_token);
        // response.send(access_token);
        // return (access_token);
    }
}