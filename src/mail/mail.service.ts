import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import appConfig from '../config/app.config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTenantInvitation({ user, url }) {
    const from = `${process.env.APP_NAME} <${appConfig().mail.from}>`;
    const subject = 'Tenant Invitation';

    await this.mailerService.sendMail({
      to: user.email,
      from: from,
      subject: subject,
      template: 'tenant-invitation',
      context: {
        url: url,
      },
    });
  }
}
