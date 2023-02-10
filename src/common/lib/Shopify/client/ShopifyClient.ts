import { ShopifyCustomer } from './Objects/ShopifyCustomer';
import { ShopifyProduct } from './Objects/ShopifyProduct';

/**
 * Shopify client for api
 */
export class ShopifyClient {
  private _token: string;
  private _shop: string;

  constructor({ token, shop }: { token: string; shop: string }) {
    this._token = token;
    this._shop = shop;
  }

  product() {
    return new ShopifyProduct({ token: this._token, shop: this._shop });
  }
  customer() {
    return new ShopifyCustomer({ token: this._token, shop: this._shop });
  }
}
