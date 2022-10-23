import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { ConfigService } from "@nestjs/config";

@Injectable ()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private prisma: PrismaService, private config: ConfigService){
        super({
            clientID: config.get('CLIENT_ID'),
            clientSecret: config.get('CLIENT_SECRET'),
            callbackURL: config.get('CALLBACK_URL'),
            passReqToCallback: true,
        })
    }
    async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) : Promise<any> {
        
        const user = await this.prisma.user.create({
            data : {
                id: profile.id,
                username: profile.username,
                full_name: profile.displayName,
                avatar: profile.photos[0].value,
                first_time: true,
            }
        });
        // req['user'] = user;
        return user;
    }
}