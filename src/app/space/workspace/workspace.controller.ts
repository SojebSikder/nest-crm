import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { HasPlanGuard } from 'src/common/guard/has-plan/has-plan.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('workspace')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiOperation({ summary: 'Create new workspace' })
  @CheckAbilities({ action: Action.Create, subject: 'Workspace' })
  @Post()
  async create(@Req() req, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    const userId = req.user.userId;

    const workspace = await this.workspaceService.create(
      userId,
      createWorkspaceDto,
    );
    if (workspace) {
      return {
        success: true,
        message: 'Workspace created successfully',
      };
    } else {
      return {
        error: true,
        message: 'Workspace not created',
      };
    }
  }

  @Get()
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(+id);
  }
}
