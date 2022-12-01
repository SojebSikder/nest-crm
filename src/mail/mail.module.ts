import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailService } from './mail.service';
import appConfig from 'src/config/app.config';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: appConfig().mail.host,
        secure: false,
        auth: {
          user: appConfig().mail.user,
          pass: appConfig().mail.password,
        },
      },
      defaults: {
        from: appConfig().mail.from,
      },
      template: {
        // dir: join(__dirname, 'templates'),
        dir: process.cwd() + '/dist/mail/templates/',
        // adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        adapter: new EjsAdapter(),
        options: {
          // strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
