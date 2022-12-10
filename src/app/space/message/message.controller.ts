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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('Message')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('space/:workspace_id/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Send message' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceContact' })
  @Post()
  async create(@Req() req, @Body() createMessageDto: CreateMessageDto) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const message = await this.messageService.create(
      user.userId,
      workspace_id,
      createMessageDto,
    );
    if (message) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
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
