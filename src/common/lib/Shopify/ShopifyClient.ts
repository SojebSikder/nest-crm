import { Fetch } from '../Fetch';

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

  /**
   * product
   * @returns
   */
  product() {
    return new Product({ token: this._token, shop: this._shop });
  }
}

class Product {
  private _token: string;
  private _shop: string;

  constructor({ token, shop }: { token: string; shop: string }) {
    this._token = token;
    this._shop = shop;
  }
  /**
   * Retrieve products
   * @param shop
   * @returns
   */
  async findAll() {
    const _token = this._token;
    const _shop = this._shop;

    const url = 'https://' + _shop + '/admin/products.json';

    const _header = {
      headers: {
        'X-Shopify-Access-Token': _token,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
      },
    };

    const res = await Fetch.get(url, _header);

    return res.data;
  }
}
