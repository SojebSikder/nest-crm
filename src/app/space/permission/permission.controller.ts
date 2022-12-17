import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HasPlanGuard } from 'src/common/guard/has-plan/has-plan.guard';

@ApiBearerAuth()
@ApiTags('Permission')
@UseGuards(JwtAuthGuard, HasPlanGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Read permissions' })
  @Get()
  async findAll() {
    const permissions = await this.permissionService.findAll();
    return {
      data: permissions,
    };
  }
}
