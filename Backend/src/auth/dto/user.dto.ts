import { IsString, IsOptional, IsNotEmpty, IsBoolean } from "class-validator"

export class UserDto{
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    two_fa_code: string;

    @IsBoolean()
    @IsNotEmpty()
    is_two_fa_enable: boolean;

    @IsBoolean()
    @IsNotEmpty()
    first_time: boolean;

    @IsString()
    @IsNotEmpty()
    email: string;
}