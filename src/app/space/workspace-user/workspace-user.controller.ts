import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkspaceUserService } from './workspace-user.service';
import { CreateWorkspaceUserDto } from './dto/create-workspace-user.dto';
import { UpdateWorkspaceUserDto } from './dto/update-workspace-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../ability/abilities.guard';
import { CheckAbilities } from '../../../ability/abilities.decorator';
import { Action } from '../../../ability/ability.factory';
import { HasPlanGuard } from '../../../common/guard/has-plan/has-plan.guard';

@ApiBearerAuth()
@ApiTags('workspace-user')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('space/:workspace_id/workspace-user')
export class WorkspaceUserController {
  constructor(private readonly workspaceUserService: WorkspaceUserService) {}

  @Post()
  create(@Body() createWorkspaceUserDto: CreateWorkspaceUserDto) {
    return this.workspaceUserService.create(createWorkspaceUserDto);
  }

  @ApiOperation({ summary: 'Find all workspace user' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceUser' })
  @Get()
  async findAll(@Request() req) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const workspaceUsers = await this.workspaceUserService.findAll(
      user.userId,
      workspace_id,
    );
    return { data: workspaceUsers };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceUserDto: UpdateWorkspaceUserDto,
  ) {
    return this.workspaceUserService.update(+id, updateWorkspaceUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceUserService.remove(+id);
  }
}
