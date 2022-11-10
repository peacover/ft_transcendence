import { Injectable, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { authenticator } from "otplib";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto";

import { toDataURL } from 'qrcode';
import { toFileStream } from 'qrcode';
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
    }
    
    async login(@Req() req, @Res() res){
        const payload = {
            // id: req.user.id,
            // username: req.user.username,
            // full_name: req.user.full_name,
            // avatar: req.user.avatar,
            // first_time: true,
            // is_two_fa_enable: false,
            // email: req.user.email, // check name of email

            id: "11",
            username: "yer-raki",
            full_name: "youssef erraki",
            avatar: "test",
            first_time: true,
            is_two_fa_enable: false,
            email: "yer-raki@student.1337.ma",
        };
        ///////////////////////////////////////// just for test
        const user = await this.prisma.user.create({
            data : {
                id: payload.id,
                username: payload.username,
                full_name: payload.full_name,
                avatar: payload.avatar,
                is_two_fa_enable: false,
                first_time: true,
                email: payload.email,
            }
        });
        //////////////////////////////////////////
        const secret = "secret-password";
        const access_token = await this.jwt.sign(payload, {
            expiresIn : '1d',
            secret : secret,
        });
        res.cookie('access_token', access_token, { httpOnly: true }).status(200);
        res.send(access_token);
    }

    async generate_qr_code(@Req() req, @Res() res){
        const user : UserDto = req.user_obj;
        if (await this.prisma.user.findUnique({
            where:{
                id : user.id,
            }
        })){
            console.log("user founded!");
            const secret = authenticator.generateSecret();
            const otpauthUrl : string = authenticator.keyuri(user.email, this.config.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
            // res.setHeader('content-type','image/png');
            // generate authenticator code then save it in db
            // generate qr based on the code generated then view it
            // compare the generated code with the one saved in the db in auth/login
            res.send(this.generateQrCodeDataURL(otpauthUrl));
        }
        else{
            console.log("user not founded!");
            res.send("user not founded!")
            throw ("User not found!");
        }

    }
    async generateQrCodeDataURL(otpAuthUrl: string) {
        return toDataURL(otpAuthUrl);
      }
}