import { IExpressRequest } from './interfaces/auth.unterface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { NOT_AUTHORIZED_ERROR } from './auth.contants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();
    try {
      const jwt = request.headers?.authorization.split(' ')[1];
      const { id } = this.jwtService.verify(jwt);
      if (id) {
        request.params.id = id;
        return true;
      }
      throw new HttpException(NOT_AUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException(NOT_AUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
    }
  }
}
