import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeMethod } from 'src/common/lib/Payment/stripe/Stripe';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Injectable()
export class CheckoutService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createCheckoutDto: CreateCheckoutDto) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        id: createCheckoutDto.plan_id,
      },
    });

    if (plan) {
      const checkout = StripeMethod.createSubscriptionCheckoutSession(
        'customer_id',
        'price_id',
      );

      return (await checkout).url;
    } else {
      return {
        error: true,
        message: 'Plan not found',
      };
    }
  }

  findAll() {
    return `This action returns all checkout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkout`;
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}
