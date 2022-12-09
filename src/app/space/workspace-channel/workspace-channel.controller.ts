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
import { WorkspaceChannelService } from './workspace-channel.service';
import { CreateWorkspaceChannelDto } from './dto/create-workspace-channel.dto';
import { UpdateWorkspaceChannelDto } from './dto/update-workspace-channel.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';
import appConfig from 'src/config/app.config';

@ApiBearerAuth()
@ApiTags('Workspace channel')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('space/:workspace_id/channel')
export class WorkspaceChannelController {
  constructor(
    private readonly workspaceChannelService: WorkspaceChannelService,
  ) {}

  @ApiOperation({ summary: 'Create workspace channel' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceChannel' })
  @Post()
  async create(
    @Req() req,
    @Body() createWorkspaceChannelDto: CreateWorkspaceChannelDto,
  ) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    try {
      const channel = await this.workspaceChannelService.create(
        user.userId,
        workspace_id,
        createWorkspaceChannelDto,
      );

      if (channel) {
        const webhook_url = `${appConfig().app.url}/api/whatsapp/webhook/${
          channel.webhook_key
        }`;
        return {
          success: true,
          data: {
            webhook_url: webhook_url,
            verify_token: channel.verify_token,
          },
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      // console.log(error.response.data);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Read workspace channel' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceChannel' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const whatsappChannels = await this.workspaceChannelService.findAll(
      user.userId,
      workspace_id,
    );
    const mappedWhatsappChannels = whatsappChannels.map((channel) => {
      const webhook_url = `${appConfig().app.url}/api/whatsapp/webhook/${
        channel.webhook_key
      }`;
      channel['webhook_url'] = webhook_url;
      return channel;
    });
    return { data: mappedWhatsappChannels };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceChannelService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update workspace channel' })
  @CheckAbilities({ action: Action.Update, subject: 'WorkspaceChannel' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWorkspaceChannelDto: UpdateWorkspaceChannelDto,
  ) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;
    const workspaceChannel = await this.workspaceChannelService.update(
      user.userId,
      workspace_id,
      +id,
      updateWorkspaceChannelDto,
    );
    if (workspaceChannel) {
      return {
        success: true,
      };
    } else {
      return { success: false };
    }
  }

  @ApiOperation({ summary: 'Delete workspace channel' })
  @CheckAbilities({ action: Action.Delete, subject: 'WorkspaceChannel' })
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;
    const workspaceChannel = await this.workspaceChannelService.remove(
      user.userId,
      workspace_id,
      +id,
    );
    if (workspaceChannel) {
      return {
        success: true,
      };
    } else {
      return { success: false };
    }
  }
}
