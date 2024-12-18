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
import { ThrottlerBehindProxyGuard } from './common/guard/throttler-behind-proxy.guard';
import { TenantModule } from './su-admin/tenant/tenant.module';
import { MailModule } from './mail/mail.module';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { UserModule } from './app/user/user.module';
import { AbilityModule } from './ability/ability.module';
import { ProfileModule } from './app/profile/profile.module';
import { WhatsappModule } from './app/whatsapp/whatsapp.module';
import { SocketModule } from './socket/socket.module';
import { ContactModule } from './app/space/contact/contact.module';
import { CountryModule } from './app/country/country.module';
import { WorkspaceUserModule } from './app/space/workspace-user/workspace-user.module';
import { WorkspaceChannelModule } from './app/space/workspace-channel/workspace-channel.module';
import { MessageModule } from './app/space/message/message.module';
import { ConversationModule } from './app/space/conversation/conversation.module';
import { PermissionModule } from './app/space/permission/permission.module';
import { StripeModule } from './app/stripe/stripe.module';
import { BillingModule } from './app/organization/billing/billing.module';
import { SpaceRoleModule } from './app/space/space-role/space-role.module';
import { ExampleModule } from './example/example.module';
import { BullModule } from '@nestjs/bull';
import { FileModule } from './app/space/file/file.module';
import { WorkspaceModule } from './app/space/workspace/workspace.module';
import { SnippetModule } from './app/space/snippet/snippet.module';
import { DynamicVariableModule } from './app/dynamic-variable/dynamic-variable.module';
import { ShopifyModule } from './app/shopify/shopify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    BullModule.forRoot({
      redis: {
        host: appConfig().redis.host,
        password: appConfig().redis.password,
        port: +appConfig().redis.port,
      },
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
    WorkspaceUserModule,
    WorkspaceChannelModule,
    ConversationModule,
    PermissionModule,
    StripeModule,
    BillingModule,
    SpaceRoleModule,
    ExampleModule,
    FileModule,
    WorkspaceModule,
    SnippetModule,
    DynamicVariableModule,
    ShopifyModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    // disbling throttling for dev {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerBehindProxyGuard,
    // },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
