import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('note')
@UseGuards(JwtAuthGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: 'Note' })
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    const user = req.user;
    return this.noteService.create({ userId: user.userId }, createNoteDto);
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'Note' })
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return this.noteService.findAll({ userId: user.userId });
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Show, subject: 'Note' })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.noteService.findOne(+id, { userId: user.userId });
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: 'Note' })
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const user = req.user;
    return this.noteService.update(+id, updateNoteDto, { userId: user.userId });
  }

  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: 'Note' })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.noteService.remove(+id, { userId: user.userId });
  }
}
