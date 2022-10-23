import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
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
    login(@Req() req, @Res() res) {
        // console.log(req.user);
        
        return this.authService.login(req, res);
    }
    
}