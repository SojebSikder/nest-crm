import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { CreateShopifyDto } from './dto/create-shopify.dto';
import { UpdateShopifyDto } from './dto/update-shopify.dto';
import { ShopifyClient } from 'src/common/lib/Shopify/client/ShopifyClient';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Get('test')
  async test() {
    const res = new ShopifyClient({
      token: 'shpua_d8d0fc123a9799a7614b38b8128e7dc1',
      shop: 'sojebdemostore.myshopify.com',
    });

    const data = await res.order().order().findAll();

    console.log(data);

    return data;
  }

  @Post()
  create(@Body() createShopifyDto: CreateShopifyDto) {
    return this.shopifyService.create(createShopifyDto);
  }

  @Get('install')
  install(@Req() req) {
    const shop = req.query.shop;

    const shopify = this.shopifyService.install(shop);

    return {
      redirect_url: shopify,
    };
  }

  @Get('auth')
  async auth(@Req() req) {
    const shop = req.query.shop;
    const code = req.query.code;
    const url = req.url;
    const shopify = await this.shopifyService.auth({
      shop,
      code,
      req_url: url,
    });

    return {
      redirect_url: shopify,
    };
  }

  @Get()
  findAll() {
    return this.shopifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopifyDto: UpdateShopifyDto) {
    return this.shopifyService.update(+id, updateShopifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopifyService.remove(+id);
  }
}
