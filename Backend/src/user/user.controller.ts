import { Body, Controller, Get, Post, Put, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoGuard, JwtGuard } from 'src/auth/guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(LocalAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    signin(@Req() req){
        return req.user_obj;
    }

    @UseGuards(JwtGuard)
    @Put('edit_username/:new_username')
    change_username(@Req() req, @Param() param){
        // console.log(req);
        return this.userService.change_username(req.user_obj, param.new_username);
    }
    
    // edit username: DONE!
    // edit avatar: ON IT
    // leaderboard: ON IT
    // history games: NOT SURE
    // achievements: ON IT
    // add friends: ON IT
    // stats of friends: ON IT
    // calcul of score:ON IT
}