import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FortyTwoGuard, JwtGuard } from "src/auth/guard";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // @UseGuards(FortyTwoGuard)
    @Get('login')
    login(@Req() req, @Res() res) {
        return this.authService.login(req, res);
    }

    @UseGuards(JwtGuard)
    @Get('2fa')
    generate_qr_code(@Req() req, @Res() res) {
        return this.authService.generate_qr_code(req, res);
    }

}
