import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    user_id: number,
    workspace_id: number,
    createSnippetDto: CreateSnippetDto,
  ) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const name = createSnippetDto.name;
    const message = createSnippetDto.message;

    const snippet = await this.prisma.snippet.create({
      data: {
        name: name,
        message: message,
        workspace_id: workspace_id,
        tenant_id: tenant_id,
      },
    });

    return snippet;
  }

  async findAll(user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const snippets = await this.prisma.snippet.findMany({
      where: {
        AND: [
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
          {
            status: 1,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        message: true,
      },
    });

    return snippets;
  }

  async findOne(id: number, user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const snippet = await this.prisma.snippet.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
          {
            status: 1,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        message: true,
      },
    });

    return snippet;
  }

  async update(
    id: number,
    user_id: number,
    workspace_id: number,
    updateSnippetDto: UpdateSnippetDto,
  ) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const name = updateSnippetDto.name;
    const message = updateSnippetDto.message;

    const data = {};

    if (name) {
      Object.assign(data, { name });
    }
    if (message) {
      Object.assign(data, { message });
    }

    const snippet = await this.snippet.updateMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
      data: {
        ...data,
      },
    });

    return snippet;
  }

  async remove(id: number, user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const snippet = await this.prisma.snippet.deleteMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });

    return snippet;
  }
}
