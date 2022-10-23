import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, config: ConfigService){
    }
    
    signup(){
        return 'post auth page';
    }
    signin(){
        return 'get auth page';
    }
    signToken(){
        // const payload = {
        //     id: user.id,
        //     username: user.username,
        //     full_name: user.full_name,
        //     avatar: user.avatar,
        //     first_time: true,
        // };
        // console.log(payload);
    }
}