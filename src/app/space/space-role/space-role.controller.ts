import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SpaceRoleService } from './space-role.service';
import { CreateSpaceRoleDto } from './dto/create-space-role.dto';
import { UpdateSpaceRoleDto } from './dto/update-space-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { HasPlanGuard } from '../../../common/guard/has-plan/has-plan.guard';
import { AbilitiesGuard } from '../../../ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('Role')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('space/:workspace_id/role')
export class SpaceRoleController {
  constructor(private readonly spaceRoleService: SpaceRoleService) {}

  @ApiOperation({ summary: 'Create workspace role' })
  @CheckAbilities({ action: Action.Create, subject: 'Role' })
  @Post()
  async create(@Req() req, @Body() createSpaceRoleDto: CreateSpaceRoleDto) {
    const user_id = req.user.userId;
    const workspace_id = req.params.workspace_id;

    const role = await this.spaceRoleService.create(
      user_id,
      workspace_id,
      createSpaceRoleDto,
    );
    if (role) {
      return {
        success: true,
        message: 'Role created successfully',
      };
    } else {
      return {
        error: true,
        message: 'Role not created',
      };
    }
  }

  @ApiOperation({ summary: 'Read workspace roles' })
  @CheckAbilities({ action: Action.Read, subject: 'Role' })
  @Get()
  async findAll(@Req() req) {
    const user_id = req.user.userId;
    const workspace_id = req.params.workspace_id;

    const roles = await this.spaceRoleService.findAll(user_id, workspace_id);
    return { data: roles };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceRoleDto: UpdateSpaceRoleDto,
  ) {
    return this.spaceRoleService.update(+id, updateSpaceRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceRoleService.remove(+id);
  }
}
