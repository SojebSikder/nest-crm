import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { KvStore } from './common/lib/KvStore';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  async test() {
    KvStore.connect({ host: 'http://localhost:8080' });
    const jsonData = {
      name: 'sojeb',
      age: 20,
    };
    const jsonDataArr = [
      {
        name: 'sojeb',
        age: 20,
      },
      {
        name: 'sikder',
        age: 18,
      },
    ];

    await KvStore.set('json', jsonData);
    await KvStore.set('jsonArray', jsonDataArr);
    const result = await KvStore.get('json');
    const resultArr = await KvStore.get('jsonArray');
    return { json: result, arr: resultArr };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const user = req.user;
    return user;
  }
}
