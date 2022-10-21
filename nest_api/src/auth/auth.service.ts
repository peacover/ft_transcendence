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