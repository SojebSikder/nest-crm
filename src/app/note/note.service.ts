// external imports
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
// internal imports
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create({ userId }, createNoteDto: CreateNoteDto) {
    const tenant_id = await UserRepository.getTenantId({ userId: userId });

    const note = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.body,
        tenant_id: tenant_id,
      },
    });
    return note;
  }

  async findAll({ userId }) {
    const tenant_id = await UserRepository.getTenantId({ userId: userId });

    const notes = await this.prisma.note.findMany({
      where: {
        tenant_id: tenant_id,
      },
    });
    return notes;
  }

  async findOne(id: number, { userId }) {
    const tenant_id = await UserRepository.getTenantId({ userId: userId });

    const note = await this.prisma.note.findFirst({
      where: {
        id: id,
        tenant_id: tenant_id,
      },
    });
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, { userId }) {
    const checkTenant = await UserRepository.checkTenant({
      model: this.prisma.note,
      userId: userId,
    });

    if (!checkTenant) {
      return false;
    }

    const note = await this.prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title: updateNoteDto.title,
        body: updateNoteDto.body,
      },
    });
    return note;
  }

  async remove(id: number, { userId }) {
    const checkTenant = await UserRepository.checkTenant({
      model: this.prisma.note,
      userId: userId,
    });

    if (!checkTenant) {
      return false;
    }

    const note = await this.prisma.note.delete({
      where: {
        id: id,
      },
    });
    return note;
  }
}
