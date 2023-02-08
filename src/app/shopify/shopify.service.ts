import { Injectable } from '@nestjs/common';
import { ShopifyAuth } from 'src/common/lib/Shopify/Shopify';
import appConfig from 'src/config/app.config';
import { CreateShopifyDto } from './dto/create-shopify.dto';
import { UpdateShopifyDto } from './dto/update-shopify.dto';

@Injectable()
export class ShopifyService {
  create(createShopifyDto: CreateShopifyDto) {
    return 'This action adds a new shopify';
  }

  install(shop: string) {
    const appId = appConfig().auth.shopify.app_id;
    const appSecret = appConfig().auth.shopify.app_secret;
    // TODO fetch access token from db
    // const appStoreToken = 'shpua_d8d0fc123a9799a7614b38b8128e7dc1';
    const appStoreToken = '';
    const appScope =
      'read_checkouts,write_checkouts,read_customers,write_customers,read_fulfillments,write_fulfillments,read_inventory,write_inventory,read_orders,write_orders,read_product_listings,read_reports,write_reports,read_products,write_products';
    shop = shop;
    const redirectUrl = `${appConfig().app.url}/api/shopify/auth`;

    const shopifyAuth = new ShopifyAuth({
      appId: appId,
      appSecret: appSecret,
    });
    const redirect_url = shopifyAuth.install({
      appScope,
      appStoreToken,
      shop,
      redirectUrl,
    });

    return redirect_url;
  }

  async auth({
    shop,
    code,
    req_url,
  }: {
    shop: string;
    code: string;
    req_url: string;
  }) {
    const appId = appConfig().auth.shopify.app_id;
    const appSecret = appConfig().auth.shopify.app_secret;
    shop = shop;
    code = code;

    const shopify = new ShopifyAuth({
      appId: appId,
      appSecret: appSecret,
    });
    const redirect_url = await shopify.auth({
      shop,
      code,
      req_url,
    });

    return redirect_url;
  }

  findAll() {
    return `This action returns all shopify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopify`;
  }

  update(id: number, updateShopifyDto: UpdateShopifyDto) {
    return `This action updates a #${id} shopify`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopify`;
  }
}
