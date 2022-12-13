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
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { Action } from 'src/ability/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@ApiBearerAuth()
@ApiTags('Conversation')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('space/:workspace_id/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @ApiOperation({ summary: 'Read conversations' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceContact' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const conversations = await this.conversationService.findAll(
      user.userId,
      workspace_id,
    );
    return {
      data: conversations,
    };
  }

  @ApiOperation({ summary: 'Show conversation' })
  @CheckAbilities({ action: Action.Show, subject: 'WorkspaceContact' })
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}