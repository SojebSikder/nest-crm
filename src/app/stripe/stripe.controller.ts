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

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // TODO
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

        if (data.plan.id === process.env.PRODUCT_BASIC) {
          console.log('You are talking about basic product');
          user.plan = 'basic';
        }

        if (data.plan.id === process.env.PRODUCT_PRO) {
          console.log('You are talking about pro product');
          user.plan = 'pro';
        }

        const hasTrial = true;
        const endDate = new Date(data.current_period_end * 1000);

        await this.stripeService.update(user.id, { trial_end_at: endDate });

        break;
      }
      case 'customer.subscription.updated': {
        // started trial
        const user = await UserService.getUserByBillingID(data.customer);

        if (data.plan.id == process.env.PRODUCT_BASIC) {
          console.log('You are talking about basic product');
          user.plan = 'basic';
        }

        if (data.plan.id === process.env.PRODUCT_PRO) {
          console.log('You are talking about pro product');
          user.plan = 'pro';
        }

        const isOnTrial = data.status === 'trialing';

        if (isOnTrial) {
          user.hasTrial = true;
          user.endDate = new Date(data.current_period_end * 1000);
        } else if (data.status === 'active') {
          user.hasTrial = false;
          user.endDate = new Date(data.current_period_end * 1000);
        }

        if (data.canceled_at) {
          // cancelled
          console.log('You just canceled the subscription' + data.canceled_at);
          user.plan = 'none';
          user.hasTrial = false;
          user.endDate = null;
        }
        console.log(
          'actual',
          user.hasTrial,
          data.current_period_end,
          user.plan,
        );

        await user.save();
        console.log('customer changed', JSON.stringify(data));
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
