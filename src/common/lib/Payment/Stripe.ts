import stripe from 'stripe';
import appConfig from 'src/config/app.config';

const STRIPE_SECRET_KEY = appConfig().payment.stripe.secret_key;
const Stripe = new stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

/**
 * Stripe payment method helper
 */
export class StripeMethod {
  /**
   * Add customer to stripe
   * @param email
   * @returns
   */
  async addNewCustomer(email: string) {
    const customer = await Stripe.customers.create({
      email: email,
      description: 'New Customer',
    });
    return customer;
  }

  /**
   * Get customer using id
   * @param id
   * @returns
   */
  async getCustomerByID(id: string) {
    const customer = await Stripe.customers.retrieve(id);
    return customer;
  }
}
