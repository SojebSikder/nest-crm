// external imports
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
// internal imports
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserRepository } from './common/repository/user/user.repository';
import { ThrottlerBehindProxyGuard } from './common/guard/throttler-behind-proxy.guard';
import { TenantModule } from './su-admin/tenant/tenant.module';
import { MailModule } from './mail/mail.module';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { UserModule } from './app/user/user.module';
import { AbilityModule } from './ability/ability.module';
import { ProfileModule } from './app/profile/profile.module';
import { MessageModule } from './message/message.module';
import { WhatsappModule } from './app/whatsapp/whatsapp.module';
import { SocketModule } from './socket/socket.module';
import { ContactModule } from './app/space/contact/contact.module';
import { CountryModule } from './app/country/country.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UrlGeneratorModule.forRoot({
      secret: appConfig().app.key,
      appUrl: appConfig().app.url,
    }),
    // General modules
    PrismaModule,
    AuthModule,
    AbilityModule,
    MailModule,
    SocketModule,
    // Super admin modules
    TenantModule,
    // app modules
    UserModule,
    ProfileModule,
    MessageModule,
    WhatsappModule,
    ContactModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    AppService,
    UserRepository,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
