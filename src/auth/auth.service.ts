// external imports
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
//internal imports
import appConfig from 'src/config/app.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/common/repository/user/user.repository';

@Injectable()
export class AuthService extends PrismaClient {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {
    super();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const _password = pass;
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      const _isValidPassword = await bcrypt.compare(_password, user.password);
      if (_isValidPassword) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException('Password not matched');
      }
    }
    return null;
  }

  async login({ email, userId }) {
    const payload = { email: email, sub: userId };
    const token = this.jwtService.sign(payload);
    return {
      // access_token: token,
      message: 'Logged in successfully',
      authorization: {
        token: token,
        type: 'bearer',
      },
    };
  }

  async register({ username, email, password }) {
    password = await bcrypt.hash(password, appConfig().security.salt);

    // Check if email and username is exists
    const userEmailExist = await UserRepository.exist({
      field: 'email',
      value: String(email),
    });
    const userNameExist = await UserRepository.exist({
      field: 'username',
      value: String(username),
    });

    if (userEmailExist) {
      return {
        statusCode: 401,
        message: 'Email already exist',
      };
    }
    if (userNameExist) {
      return {
        statusCode: 401,
        message: 'Username already exist',
      };
    }

    await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return {
      statusCode: 401,
      message: 'Account created successfully',
    };
  }
}
