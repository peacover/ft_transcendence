import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { FortyTwoGuard } from 'src/auth/guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';

// guard gloab to check if user have access token
@UseGuards(LocalAuthGuard)
@Controller('test')
export class UserController {
    constructor(private userService: UserService){}

    @Get() 
    signin(){
        return "get user page";
    }
    
}