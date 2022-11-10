import { Module } from "@nestjs/common";
import { FortyTwoStrategy } from "src/auth/strategy/FortyTwo.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule} from "@nestjs/jwt";


@Module({
  // imports: [
  //   UsersModule, 
  //   PassportModule,
  //   JwtModule.register({
  //     secret: "secret-password",
  //     signOptions: {expiresIn: '1d'}
  //   })],
//   imports: [
//     ConfigModule,
//     UsersModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//         secret: 'SuperSecretJWTKey',
//         signOptions: { expiresIn: 3600 },
//     }),
// ],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
  imports: [ JwtModule.register({}) ],
})
export class AuthModule {

}