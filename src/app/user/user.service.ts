import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/common/repository/user/user.repository';
import appConfig from 'src/config/app.config';
import { PrismaHelper } from 'src/prisma/helper/exclude';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async me({ userId }) {
    const user = await UserRepository.getUserDetails({ userId: userId });
    const excludedData = PrismaHelper.exclude(user, ['password']);
    return excludedData;
  }

  async create(createUserDto: CreateUserDto, tenant_id) {
    const user = await UserRepository.inviteUser({
      username: createUserDto.username,
      email: createUserDto.email,
      role_id: createUserDto.role_id,
      tenant_id: tenant_id,
    });
    return user;
  }

  async findAll(userId) {
    const tenant_id = await UserRepository.getTenantId({ userId: userId });
    const user = await this.prisma.user.findMany({
      where: {
        tenant_id: tenant_id,
      },
    });
    return user;
  }

  async findOne(id: number, userId) {
    const tenant_id = await UserRepository.getTenantId({ userId: userId });
    const user = await this.prisma.user.findFirst({
      where: {
        tenant_id: tenant_id,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number, userId) {
    return 'delete something';
  }

  async setPassword({ userId, password }) {
    const hashedPasssword = await bcrypt.hash(
      password,
      appConfig().security.salt,
    );
    const user = await UserRepository.getUserDetails({ userId: userId });
    if (user) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPasssword,
        },
      });
      return user;
    } else {
      return false;
    }
  }
}
