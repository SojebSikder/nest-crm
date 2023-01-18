import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  /**
   * process job
   * @param job
   * @returns
   */
  @Process('sendMemberInvitation')
  async handleSendMemberInvitation(job: Job<any>) {
    await this.mailerService.sendMail({
      to: job.data.to,
      from: job.data.from,
      subject: job.data.subject,
      template: job.data.template,
      context: job.data.context,
    });
  }
}
