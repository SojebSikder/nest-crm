import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  async create(
    user_id: number,
    workspace_id: number,
    createContactDto: CreateContactDto,
  ) {
    try {
      workspace_id = Number(workspace_id);
      const tenant_id = await UserRepository.getTenantId({ userId: user_id });

      await this.prisma.contact.create({
        data: {
          fname: createContactDto.fname,
          lname: createContactDto.lname,
          email: createContactDto.email,
          phone_number: createContactDto.phone_number,
          country_id: Number(createContactDto.country_id),
          assignee_id: Number(createContactDto.assignee_id),
          workspace_id: Number(workspace_id),
          tenant_id: tenant_id,
        },
      });

      return true;
    } catch (error) {
      // return false;
      throw error;
    }
  }

  async findAll(user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });
    const contacts = await this.prisma.contact.findMany({
      include: {
        assignee: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
          },
        },
        country: {
          select: {
            id: true,
            name: true,
            flag: true,
            dial_code: true,
            country_code: true,
          },
        },
      },
      where: {
        AND: [
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });
    return contacts;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
