import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import {Strategy} from "@nest/passport-local";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}