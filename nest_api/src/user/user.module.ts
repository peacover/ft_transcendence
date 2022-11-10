import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FortyTwoGuard } from 'src/auth/guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, FortyTwoGuard],
  controllers: [UserController]
})
export class UsersModule {}
