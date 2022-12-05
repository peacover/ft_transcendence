import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Achievement, UserStatus } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from './dto';
import { S3 } from 'aws-sdk';
import crypto = require('crypto');

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private config: ConfigService){
    }
    signup(){
        return 'post user page';
    }
    signin(){
        return 'get user page';
    }
    async change_username(user : UserDto, new_username : string){
        await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    username: new_username,
                }
        });
    }
    async get_user_score(user_obj : UserDto, @Res() res){
        const user = await this.get_user(user_obj.id);
        const win : number = user.win;
        const lose : number = user.lose;
        let score : number = 0;
        const winrate = win / (win + lose) * 100;
        if (winrate >= 80){
            score = (win * 300) - (lose * 100) + 1000;
        }
        else if (winrate >= 60){
            score = (win * 300) - (lose * 100) + 500;
        }
        else if (winrate >= 50){
            score = (win * 300) - (lose * 100) + 200;
        }
        else{
            score = (win * 300) - (lose * 100);
        }
        res.json(await this.update_user_score(user, score));
    }
    async get_user(req_id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id : req_id,
            }
        });
        return user;
    }
    async update_user_score(user, score : number){
        const updated_user = await this.prisma.user.update({
            where: {id: user.id },
            data: {
                score: score,
            }
          });
        return updated_user;
    }
    async update_user_achievements(user, achievement : Achievement){
        if (!user.achievements.includes(achievement)){
            const updated_user = await this.prisma.user.update({
                where: {id: user.id },
                data: {
                    achievements: {
                        push: achievement,
                    }
                }
              });
            return updated_user;
        }
        return user;
    }
    async edit_user_status(user : UserDto, status : UserStatus){
        await this.prisma.user.update({
            where: {id: user.id },
            data: {
                status: status,
            }
          });
    }
    async get_user_achievements(user_obj : UserDto){
        let user = await this.get_user(user_obj.id);
        const winrate = user.win / (user.win + user.lose) * 100;
        if(user.win_streak >= 10){
            user = await this.update_user_achievements(user, Achievement.TEN_WIN_STREAK);
        }
        else if (user.win_streak >= 5){
            user = await this.update_user_achievements(user, Achievement.FIVE_WIN_STREAK);
        }
        if (winrate >= 80){
            user = await this.update_user_achievements(user, Achievement.LEGEND_WIRATE);
        }
        else if (winrate >= 60){
            user = await this.update_user_achievements(user, Achievement.GREAT_WIRATE);
        }
        else if (winrate >= 50){
            user = await this.update_user_achievements(user, Achievement.DECENT_WIRATE);
        }
        else{
            user = await this.update_user_achievements(user, Achievement.GREAT_LOSER);
        }
        return user.achievements;
    }
    async get_leaderboard(){
        const users = await this.prisma.user.findMany({
            orderBy: {
                score: 'desc',
            },
            take: 10,
        });
        // for(let i = 0; i < users.length; i++){
        //     console.log(users[i].score, users[i].username);
        // }
        return users;
    }
    async add_friend(user : UserDto, friend_name : string){

        const nb_user : number = await this.prisma.user.count({
            where:{
                username: friend_name,
            }
        });
        if (nb_user == 0){
            throw 'User not found';
        }
        else if (nb_user == 1){
            const friend = await this.prisma.user.findFirst({
                where: {
                    username : friend_name,
                }
            });
            const user_friends = await this.prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    friends: true,
                }
            });
            for (let i = 0; i < user_friends.friends.length; i++){
                if (user_friends.friends[i].username == friend_name){
                    throw 'Friend already added';
                }
            }
            const updated_user = await this.prisma.user.update({
                where: {id: user.id },
                data: {
                    friends: {
                        connect: {
                            id: friend.id,
                        }
                    }
                },
                include: {friends : true},
            });
            return updated_user.friends;
        }
    }
    async upload(user_obj : UserDto, file) {
        const user = await this.get_user(user_obj.id);
        const { originalname } = file;
        const bucketS3 = this.config.get('AWS_BUCKET_NAME');;
        return (await this.uploadS3(user, file.buffer, bucketS3, originalname));
    }
    async uploadS3(user, file, bucket, name) {
        const s3 = this.getS3();
        const generateFileName = ((bytes = 15) => crypto.randomBytes(bytes).toString('hex'));
        const fileName : string = generateFileName() + name;

    //     const sharp = require('sharp');
    //     const fileBuffer = await sharp(file)
    // .resize({ height: 1920, width: 1080, fit: "contain" })
    // .toBuffer()

        var params = {
            Bucket: bucket,
            Key: fileName,
            ContentEncoding: 'base64',
            ContentDisposition: 'inline',
            ContentType: 'image/jpeg' || 'image/png' || 'image/jpg' || 'image/gif',
            Body: file,
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                resolve(data);

                this.upload_avatar(user, data.Location, bucket, s3, data.Key);
                
            });
            
        });
    }
    getS3() {
        return new S3({
            accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
        });
    }
    async upload_avatar(user, avatar_link : string, bucket, s3, data_key : string){
        const old_avatar = user.avatar;
        const old_avatar_key = user.avatar_key;
        
        await this.prisma.user.update({
            where: {id: user.id },
            data: {
                avatar: avatar_link,
                avatar_key: data_key,
            }
          });
        if (old_avatar_key != null){
            var params = {  Bucket: bucket, Key: old_avatar_key };
            s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);  // error
            else     console.log();                 // deleted
            });
        }
    }

        

}