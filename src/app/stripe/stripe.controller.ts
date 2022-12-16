import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeMethod } from 'src/common/lib/Payment/stripe/Stripe';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { DateHelper } from 'src/common/helper/date.helper';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  async create(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;
    try {
      event = StripeMethod.createWebhook(req.body, sig);
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }
    const data: any = event.data.object;
    // handle the event
    switch (event.type) {
      case 'customer.created':
        console.log(JSON.stringify(data));
        break;
      case 'invoice.paid':
        break;
      case 'customer.subscription.created': {
        const user = await UserRepository.getUserByBillingID(data.customer);
        const plan = await this.stripeService.plan.findFirst({
          where: {
            AND: [
              {
                plan_price_id: data.plan.id,
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
          await this.stripeService.subscription.create({
            data: {
              tenant_id: user.tenant_id,
              plan_id: plan.id,
              start_at: start_date,
              end_at: end_date,
              payment_method: 'stripe',
            },
          });
        }
        break;
      }
      case 'customer.subscription.updated': {
        // started trial
        const user = await UserRepository.getUserByBillingID(data.customer);

        const plan = await this.stripeService.plan.findFirst({
          where: {
            AND: [
              {
                plan_price_id: data.plan.id,
              },
              {
                status: 1,
              },
            ],
          },
        });

        if (plan) {
          if (data.canceled_at) {
            // cancelled
            await this.stripeService.subscription.deleteMany({
              where: {
                tenant_id: user.tenant_id,
              },
            });
          } else {
            // add subscription
            const start_date = DateHelper.now();
            const end_date = DateHelper.add(30, 'days').toISOString();
            await this.stripeService.subscription.updateMany({
              where: {
                tenant_id: user.tenant_id,
              },
              data: {
                plan_id: plan.id,
                start_at: start_date,
                end_at: end_date,
              },
            });
          }
        }
        break;
      }
      default:
    }
    return this.stripeService.create();
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
