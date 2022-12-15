import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StripeService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create() {
    return 'This action adds a new stripe';
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  async update(id: number, { trial_end_at }) {
    // await this.prisma.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {

    //   },
    // });
    await this.prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        trial_end_at: trial_end_at,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
