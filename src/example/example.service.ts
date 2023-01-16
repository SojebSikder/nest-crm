import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { Queue } from 'bull';
@Injectable()
export class ExampleService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}
  create(createExampleDto: CreateExampleDto) {
    return 'This action adds a new example';
  }

  async findAll() {
    // TODO add queue
    const job = await this.queue.add('sendMessage', {
      message: 'hello sojeb',
    });
    return job.data;

    // end testing
    // return `This action returns all example`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
