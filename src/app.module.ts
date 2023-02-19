// external imports
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
// internal imports
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { ThrottlerBehindProxyGuard } from './common/guard/throttler-behind-proxy.guard';
import { TenantModule } from './modules/su-admin/tenant/tenant.module';
import { MailModule } from './providers/mail/mail.module';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { UserModule } from './modules/app/user/user.module';
import { AbilityModule } from './providers/ability/ability.module';
import { ProfileModule } from './modules/app/profile/profile.module';
import { WhatsappModule } from './modules/app/whatsapp/whatsapp.module';
import { SocketModule } from './providers/socket/socket.module';
import { ContactModule } from './modules/app/space/contact/contact.module';
import { CountryModule } from './modules/app/country/country.module';
import { WorkspaceUserModule } from './modules/app/space/workspace-user/workspace-user.module';
import { WorkspaceChannelModule } from './modules/app/space/workspace-channel/workspace-channel.module';
import { MessageModule } from './modules/app/space/message/message.module';
import { ConversationModule } from './modules/app/space/conversation/conversation.module';
import { PermissionModule } from './modules/app/space/permission/permission.module';
import { StripeModule } from './modules/app/stripe/stripe.module';
import { BillingModule } from './modules/app/organization/billing/billing.module';
import { SpaceRoleModule } from './modules/app/space/space-role/space-role.module';
import { ExampleModule } from './modules/example/example.module';
import { FileModule } from './modules/app/space/file/file.module';
import { WorkspaceModule } from './modules/app/space/workspace/workspace.module';
import { SnippetModule } from './modules/app/space/snippet/snippet.module';
import { DynamicVariableModule } from './modules/app/dynamic-variable/dynamic-variable.module';
import { ShopifyModule } from './modules/app/shopify/shopify.module';
import { TemplateModule } from './modules/app/space/template/template.module';

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
    TemplateModule,
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
