import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { FortyTwoStrategy } from "src/strategy/FortyTwo.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {

}