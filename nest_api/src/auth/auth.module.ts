import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FortyTwoStrategy } from "src/auth/strategy/FortyTwo.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {

}