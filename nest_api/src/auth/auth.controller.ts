import { Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
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

    // @Post('login/2fa')
    @Get("login/2fa/:2fa_code")
    verify_2fa(@Req() req, @Res() res, @Param() param) {
        console.log("tesssst");
        return this.authService.verify_2fa(req, res, param);
    }

    @UseGuards(JwtGuard)
    @Post('enable_2fa')
    enable_2fa(@Req() req, @Res() res){
        this.authService.enable_2fa(req, res, req.user_obj);
    }

    @UseGuards(JwtGuard)
    @Get('2fa/generate')
    async generate_qr_code(@Req() req, @Res() res) {
        const { otpauthUrl } = await this.authService.generate_2fa_secret(req.user_obj);
        return (this.authService.pipeQrCodeStream(res, otpauthUrl));
    }
}
