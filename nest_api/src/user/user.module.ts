import { Module } from '@nestjs/common';
import { FortyTwoGuard } from 'src/auth/guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, FortyTwoGuard],
  controllers: [UserController]
})
export class UserModule {}
