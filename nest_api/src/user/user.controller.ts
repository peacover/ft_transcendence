import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoGuard } from 'src/auth/guard';
import { JwtAuthGuard} from 'src/auth/guard/jwt.guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';

// guard gloab to check if user have access token
@UseGuards(LocalAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // @UseGuards(JwtAuthGuard)
    @Get(":id") 
    signin(){
        return "get user page";
    }
    
}