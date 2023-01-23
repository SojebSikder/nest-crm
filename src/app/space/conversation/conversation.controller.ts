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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from '../../../ability/abilities.decorator';
import { AbilitiesGuard } from '../../../ability/abilities.guard';
import { Action } from '../../../ability/ability.factory';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { HasPlanGuard } from '../../../common/guard/has-plan/has-plan.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@ApiBearerAuth()
@ApiTags('Conversation')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('space/:workspace_id/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @ApiOperation({ summary: 'Read conversations' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceConversation' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const open = req.query.open ? req.query.open : true;
    const workspace_channel_id = req.query.workspace_channel_id;
    const userId = req.user.userId;

    const conversations = await this.conversationService.findAll({
      isOpen: open,
      userId: userId,
      workspace_id: workspace_id,
      workspace_channel_id: workspace_channel_id,
    });
    return {
      data: conversations,
    };
  }

  @ApiOperation({ summary: 'Show conversation' })
  @CheckAbilities({ action: Action.Show, subject: 'WorkspaceConversation' })
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;
    const conversation = await this.conversationService.findOne(
      user.userId,
      workspace_id,
      +id,
    );
    return { data: conversation };
  }

  @ApiOperation({ summary: 'Update conversation' })
  @CheckAbilities({ action: Action.Update, subject: 'WorkspaceConversation' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const conversation = await this.conversationService.update(+id, {
      updateConversationDto,
      workspace_id: workspace_id,
      user_id: user.userId,
    });

    if (conversation) {
      return {
        success: true,
      };
    } else {
      return {
        error: true,
        message: 'Conversation not updated',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
