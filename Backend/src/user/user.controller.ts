import { Body, Controller, Get, Post, Put, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoGuard, JwtGuard } from 'src/auth/guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(LocalAuthGuard)
@Controller('home')
export class UserController {
    constructor(private userService: UserService){}

    // @UseGuards(JwtAuthGuard)
    @Get('me')
    signin(){
        return "get user page";
    }

    @UseGuards(JwtGuard)
    @Get('display/:new_display_name')
    change_username(@Req() req, @Param() param){
        console.log(req.user_obj, param.new_display_name);
        return (req.user_obj, param.new_display_name);
    }

    // edit username
    // edit avatar
    // leaderboard
    // history games ?
    // achievements
    // add friends
    // stats of friends
    // calcul of score
}