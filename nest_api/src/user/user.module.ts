import { Module } from '@nestjs/common';
import { FortyTwoGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, FortyTwoGuard, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
