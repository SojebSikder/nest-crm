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
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../ability/abilities.guard';
import { CheckAbilities } from '../../../ability/abilities.decorator';
import { Action } from '../../../ability/ability.factory';
import { HasPlanGuard } from '../../../common/guard/has-plan/has-plan.guard';

@ApiBearerAuth()
@ApiTags('Message')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('space/:workspace_id/message/:conversation_id')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Send message' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceConversation' })
  @Post()
  async create(@Req() req, @Body() createMessageDto: CreateMessageDto) {
    const workspace_id = req.params.workspace_id;
    const conversation_id = req.params.conversation_id;
    const user = req.user;

    const message = await this.messageService.create(
      { user_id: user.userId, workspace_id, conversation_id },
      createMessageDto,
    );
    if (message) {
      const data = {
        message: message,
      };

      return {
        success: true,
        message: 'Message sent successfully.',
        data: data,
      };
    } else {
      return {
        error: true,
        message: 'Message not sent.',
      };
    }
  }

  @ApiOperation({ summary: 'Read messages' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceConversation' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const workspace_channel_id = req.query.workspace_channel_id;
    const conversation_id = req.params.conversation_id;
    const user = req.user;

    const messages = await this.messageService.findAll({
      user_id: user.userId,
      workspace_channel_id: workspace_channel_id,
      conversation_id,
      workspace_id,
    });
    if (messages) {
      return {
        data: messages,
      };
    } else {
      return [];
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
