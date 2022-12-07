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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { Action } from 'src/ability/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiBearerAuth()
@ApiTags('contact')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create contact' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceContact' })
  @Post()
  create(@Request() req, @Body() createContactDto: CreateContactDto) {
    const user = req.user;
    const workspace_id = createContactDto.workspace_id;
    return this.contactService.create(createContactDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceContact' })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @CheckAbilities({ action: Action.Show, subject: 'WorkspaceContact' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @CheckAbilities({ action: Action.Update, subject: 'WorkspaceContact' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'WorkspaceContact' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
