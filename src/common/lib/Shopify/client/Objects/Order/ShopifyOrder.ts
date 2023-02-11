import { Fetch } from '../../../../Fetch';

export class ShopifyOrder {
  private _token: string;
  private _shop: string;

  constructor({ token, shop }: { token: string; shop: string }) {
    this._token = token;
    this._shop = shop;
  }

  order() {
    return new ShopifyOrderCheckout({
      token: this._token,
      shop: this._shop,
    });
  }

  abandonedCheckout() {
    return new ShopifyAbandonedCheckout({
      token: this._token,
      shop: this._shop,
    });
  }
}

class ShopifyOrderCheckout {
  private _token: string;
  private _shop: string;

  constructor({ token, shop }: { token: string; shop: string }) {
    this._token = token;
    this._shop = shop;
  }

  async findAll() {
    const _token = this._token;
    const _shop = this._shop;

    const url = 'https://' + _shop + '/admin/orders.json';

    const _header = {
      headers: {
        'X-Shopify-Access-Token': _token,
        'Content-Type': 'application/json',
      },
    };

    const res = await Fetch.get(url, _header);

    return res.data;
  }
}
class ShopifyAbandonedCheckout {
  private _token: string;
  private _shop: string;

  constructor({ token, shop }: { token: string; shop: string }) {
    this._token = token;
    this._shop = shop;
  }

  async findAll() {
    const _token = this._token;
    const _shop = this._shop;

    const url = 'https://' + _shop + '/admin/checkouts.json';

    const _header = {
      headers: {
        'X-Shopify-Access-Token': _token,
        'Content-Type': 'application/json',
      },
    };

    const res = await Fetch.get(url, _header);

    return res.data;
  }

  async count() {
    const _token = this._token;
    const _shop = this._shop;

    const url = 'https://' + _shop + '/admin/checkouts/count.json';

    const _header = {
      headers: {
        'X-Shopify-Access-Token': _token,
        'Content-Type': 'application/json',
      },
    };

    const res = await Fetch.get(url, _header);

    return res.data;
  }
}
