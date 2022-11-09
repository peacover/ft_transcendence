import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('in constructor');
  }

  validate(payload: any) : any {
    console.log('test');
    console.log(payload);
    
    // validating payload here
		// if (<user is authenticated>) {
		// 	return <user data here>
		// }

		// // return 401 Unauthorized error
    // return null;
  }
}