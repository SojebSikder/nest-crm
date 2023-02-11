import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../common/repository/user/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
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
      const tenant_id = await UserRepository.getTenantId(user_id);

      const data = {};
      if (createContactDto.fname) {
        Object.assign(data, {
          fname: createContactDto.fname,
        });
      }
      if (createContactDto.lname) {
        Object.assign(data, {
          lname: createContactDto.lname,
        });
      }
      if (createContactDto.email) {
        Object.assign(data, {
          email: createContactDto.email,
        });
      }
      if (createContactDto.phone_number) {
        Object.assign(data, {
          phone_number: createContactDto.phone_number,
        });
      }
      if (Number(createContactDto.country_id)) {
        Object.assign(data, {
          country_id: Number(createContactDto.country_id),
        });
      }
      if (Number(createContactDto.assignee_id)) {
        Object.assign(data, {
          assignee_id: Number(createContactDto.assignee_id),
        });
      }

      await this.prisma.contact.create({
        data: {
          ...data,
          workspace_id: workspace_id,
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
    const tenant_id = await UserRepository.getTenantId(user_id);

    const contacts = await this.prisma.contact.findMany({
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
    });
    // const conversation = await this.prisma.conversation.findFirst({
    //   where:{

    //   }
    // });
    return contacts;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  async remove(id: number, user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const contact = await this.prisma.contact.deleteMany({
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

    return contact;
  }
}
