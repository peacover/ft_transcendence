import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FortyTwoGuard } from "src/auth/guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    signup(){
        return this.authService.signup();
    }

    @UseGuards(FortyTwoGuard)
    @Get('login')
    login() {
        return this.authService.signToken();
    }

    @Get() 
    signin(){
        console.log();
        return this.authService.signin();
    }
    
}