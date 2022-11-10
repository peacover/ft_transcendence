import { Injectable, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
    }
    
    async login(@Req() req, @Res() res){
        const payload = {
            id: req.user.id,
            username: req.user.username,
            full_name: req.user.full_name,
            avatar: req.user.avatar,
            first_time: true,
        };
        const secret = "secret-password";
        const access_token = await this.jwt.sign(payload, {
            expiresIn : '1d',
            secret : secret,
        });
        res.cookie('access_token', access_token, { httpOnly: true }).status(200);
        res.send(access_token);
    }

    async login_2fa(@Req() req, @Res() res){
        const user : UserDto = req.user_obj;
        if (await this.prisma.user.findUnique({
            where:{
                id : user.id,
            }
        })){
            console.log("user founded!");
            // generate authenticator code then save it in db
            // generate qr based on the code generated then view it
            // compare the generated code with the one saved in the db in auth/login

            res.send("user founded!")
        }
        else{
            console.log("user not founded!");
            res.send("user not founded!")
            throw ("User not found!");
        }

    }
}