import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { config } from 'dotenv';

config();

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.FORTYTWO_CLIENT_ID,
      clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
      callbackURL: 'http://localhost:9000/api/auth/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { id, username, name, photos } = profile;
    console.log('user profile data', id, username, name, photos);
    done(null, profile);
  }
}