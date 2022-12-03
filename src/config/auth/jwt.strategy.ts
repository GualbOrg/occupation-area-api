import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({

      secretOrKey: `-----BEGIN CERTIFICATE-----\n${configService.get('PUBLIC_CERTIFICATE_JWT')}\n-----END CERTIFICATE-----`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,

    });
  }

  validate(payload: unknown): unknown {
    console.log(payload)
    return payload;
  }
}