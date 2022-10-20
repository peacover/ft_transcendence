import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){

    }
    signup(){
        return 'post user page';
    }
    signin(){
        return 'get user page';
    }
}

@Injectable ({})
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService){
        super({
            clientID: "u-s4t2ud-1b6b8de5a6ea0d587f46ed108a448d7aa0fabd3e73526f770feda12b43b5fe43",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/login/",
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: any, cb: any) : Promise<any> {
        console.log(profile);
        // User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
        //     return cb(err, user);
        //   });
    }
}