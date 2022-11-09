import { Module } from "@nestjs/common";
import { FortyTwoStrategy } from "src/auth/strategy/FortyTwo.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy, JwtStrategy],
  // imports: [ JwtModule.register({}) ],
})
export class AuthModule {

}