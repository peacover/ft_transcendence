import { Body, Controller, Get, Post, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthDto } from "src/dto";
import { FortyTwoGuard } from "src/guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    signup(@Body() dto: AuthDto){
        console.log(dto.email);
        return this.authService.signup();
    }

    @UseGuards(FortyTwoGuard)
    @Get('login')
    login() {

    }

    @Get('user') 
    signin(@Body() dto: AuthDto){
        console.log();
        return this.authService.signin();
    }
    
}