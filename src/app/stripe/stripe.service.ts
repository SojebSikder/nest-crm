import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DateHelper } from '../../common/helper/date.helper';
import { UserRepository } from '../../common/repository/user/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StripeService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  async create({
    customer,
    plan_price_id,
  }: {
    customer: string;
    plan_price_id: string;
  }) {
    const user = await UserRepository.getUserByBillingID(customer);
    const plan = await this.prisma.plan.findFirst({
      where: {
        AND: [
          {
            plan_price_id: plan_price_id,
          },
          {
            status: 1,
          },
        ],
      },
    });

    if (plan) {
      // add subscription
      const start_date = DateHelper.now();
      const end_date = DateHelper.add(30, 'days').toISOString();
      await this.prisma.subscription.create({
        data: {
          tenant_id: user.tenant_id,
          plan_id: plan.id,
          start_at: start_date,
          end_at: end_date,
          payment_method: 'stripe',
        },
      });
    }
    return 'This action adds a new stripe';
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  async update(
    tenant_id: number,
    { plan_price_id }: { plan_price_id: string },
  ) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        AND: [
          {
            plan_price_id: plan_price_id,
          },
          {
            status: 1,
          },
        ],
      },
    });

    if (plan) {
      // add subscription
      const start_date = DateHelper.now();
      const end_date = DateHelper.add(30, 'days').toISOString();
      await this.prisma.subscription.updateMany({
        where: {
          tenant_id: tenant_id,
        },
        data: {
          plan_id: plan.id,
          start_at: start_date,
          end_at: end_date,
        },
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
