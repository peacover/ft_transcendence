import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){
    }
    
    signup(){
        return 'post user page';
    }
    signin(){
        return 'get user page';
    }
    async change_username(user : UserDto, new_username : string){
        await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    username: new_username,
                }
        });
    }
}