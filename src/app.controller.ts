import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = req.user;
    return user;
  }

  @ApiOperation({ summary: 'Register a user' })
  @Post('auth/register')
  create(@Body() data) {
    const fname = data.fname;
    const lname = data.lname;
    const email = data.email;
    const password = data.password;

    if (!fname) {
      throw new HttpException(
        'First name not provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!lname) {
      throw new HttpException(
        'Last name not provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!email) {
      throw new HttpException('Email not provided', HttpStatus.UNAUTHORIZED);
    }
    if (!password) {
      throw new HttpException('Password not provided', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.register({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = req.user;
    return this.authService.login({
      userId: user.id,
      email: user.email,
    });
  }

  @Get('/auth/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/auth/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
