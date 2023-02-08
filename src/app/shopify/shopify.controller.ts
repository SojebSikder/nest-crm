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

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

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
      address_url: url,
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
