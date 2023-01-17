import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UrlGeneratorService } from 'nestjs-url-generator';
import { DateHelper } from 'src/common/helper/date.helper';
import { UcodeRepository } from 'src/common/repository/ucode/ucode.repository';
import { MailService } from 'src/mail/mail.service';
import { UserRepository } from '../../common/repository/user/user.repository';
import appConfig from '../../config/app.config';
import { PrismaHelper } from '../../prisma/helper/exclude';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends PrismaClient {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly urlGeneratorService: UrlGeneratorService,
  ) {
    super();
  }

  async me({ userId }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        fname: true,
        lname: true,
        username: true,
        email: true,
        avatar: true,
        availability: true,
        tenant_id: true,
        tenant: {
          select: {
            id: true,
            name: true,
            trial_end_at: true,
          },
        },
        workspace_users: {
          select: {
            workspace_id: true,
            workspace: {
              select: {
                id: true,
                name: true,
                conversations: {
                  include: {
                    contact: {
                      select: {
                        id: true,
                        fname: true,
                        lname: true,
                        email: true,
                        assignee_id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        role_users: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (user) {
      // const excludedData = PrismaHelper.exclude(user, ['password']);
      return user;
    } else {
      return false;
    }
  }

  async create(createUserDto: CreateUserDto, user_id) {
    const tenant_id = await UserRepository.getTenantId(user_id);
    // Check if email and username is exists
    const userEmailExist = await UserRepository.exist({
      field: 'email',
      value: String(createUserDto.email),
    });

    if (userEmailExist) {
      return {
        error: true,
        statusCode: 401,
        message: 'Email already exist',
      };
    }

    const userUserExist = await UserRepository.exist({
      field: 'username',
      value: String(createUserDto.username),
    });

    if (userUserExist) {
      return {
        statusCode: 401,
        message: 'Username already exist',
      };
    }

    const user = await UserRepository.inviteUser({
      username: createUserDto.username,
      email: createUserDto.email,
      role_id: createUserDto.role_id,
      tenant_id: tenant_id,
    });

    if (user) {
      // send invitation mail to user
      const expired_at = DateHelper.add(7, 'days').toDate();
      const ucode = await UcodeRepository.createToken({
        userId: user.id,
        expired_at: expired_at,
      });
      const signed_url = this.urlGeneratorService.signUrl({
        relativePath: `user/invitation/${user.id}`,
        query: {
          token: ucode,
          email: user.email,
        },
        expirationDate: expired_at,
      });
      await this.mailService.sendMemberInvitation({
        user: user,
        url: signed_url,
      });

      return {
        data: user,
        success: true,
        message: 'User has been invited successfully',
      };
    } else {
      return {
        error: true,
        message: 'User not created. something went wrong',
      };
    }
  }

  async findAll(userId) {
    const tenant_id = await UserRepository.getTenantId(userId);
    const user = await this.prisma.user.findMany({
      where: {
        tenant_id: tenant_id,
      },
    });
    return user;
  }

  async findOne(id: number, userId) {
    const tenant_id = await UserRepository.getTenantId(userId);
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
    const user = await UserRepository.getUserDetails(userId);
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
