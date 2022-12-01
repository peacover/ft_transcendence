import { Injectable, Req, Res } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { UserStatus } from '@prisma/client';
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
    async get_user_score(user_obj : UserDto, @Res() res){
        const user = await this.get_user(user_obj.id);
        const win : number = user.win;
        const lose : number = user.lose;
        let score : number = 0;
        const winrate = win / (win + lose) * 100;
        if (winrate >= 80){
            score = (win * 300) - (lose * 100) + 1000;
        }
        else if (winrate >= 60){
            score = (win * 300) - (lose * 100) + 500;
        }
        else if (winrate >= 50){
            score = (win * 300) - (lose * 100) + 200;
        }
        else{
            score = (win * 300) - (lose * 100);
        }
        res.json(await this.update_user_score(user, score));
    }
    async get_user(req_id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id : req_id,
            }
        });
        return user;
    }
    async update_user_score(user, score : number){
        const updated_user = await this.prisma.user.update({
            where: {id: user.id },
            data: {
                score: score,
            }
          });
        return updated_user;
    }
    async edit_user_status(user : UserDto, status : UserStatus){
        await this.prisma.user.update({
            where: {id: user.id },
            data: {
                status: status,
            }
          });
    }
}