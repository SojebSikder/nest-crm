import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { RawBodyMiddleware } from '../../../common/middleware/rawBody.middleware';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('stripe/webhook');
  }
}
