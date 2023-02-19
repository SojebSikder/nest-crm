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
import { StripeMethod } from '../../../common/lib/Payment/stripe/Stripe';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { UserRepository } from '../../../common/repository/user/user.repository';

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
        // create subscription
        await this.stripeService.create({
          customer: data.customer,
          plan_price_id: data.plan.id,
        });

        break;
      }

      case 'customer.subscription.updated': {
        const user = await UserRepository.getUserByBillingID(data.customer);

        if (data.canceled_at) {
          // cancelled
          await this.stripeService.subscription.deleteMany({
            where: {
              tenant_id: user.tenant_id,
            },
          });
        } else {
          // update plan
          await this.stripeService.update(user.tenant_id, {
            plan_price_id: data.plan.id,
          });
        }
        break;
      }
      default:
    }
    return res.sendStatus(200);
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
