import { Module } from '@nestjs/common';
import { FortyTwoGuard } from 'src/user/guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, FortyTwoGuard],
  controllers: [UserController]
})
export class UserModule {}
