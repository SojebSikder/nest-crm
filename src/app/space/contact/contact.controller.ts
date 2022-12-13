import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  FileTypeValidator,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import * as Papa from 'papaparse';
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
@Controller('space/:workspace_id/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create contact' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceContact' })
  @Post()
  async create(@Req() req, @Body() createContactDto: CreateContactDto) {
    try {
      const workspace_id = req.params.workspace_id;
      const user = req.user;

      const contact = await this.contactService.create(
        user.userId,
        workspace_id,
        createContactDto,
      );

      if (contact) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // import contact
  @ApiOperation({ summary: 'Import contact' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceDataBackup' })
  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  async import(
    @Req() req,
    @Body() importContactDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      // const workspace_id = req.params.workspace_id;
      // const user = req.user;
      const csvFile = readFileSync(`files/${file.filename}`);
      const csvData = csvFile.toString();

      const parsedCsv = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => results.data,
      });
      console.log(parsedCsv);
    } catch (error) {
      throw error;
    }
  }

  // export contact
  @ApiOperation({ summary: 'Export contact' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceDataBackup' })
  @Get('export')
  async export(@Req() req, @Res({ passthrough: true }) res: Response) {
    try {
      const workspace_id = req.params.workspace_id;
      const user = req.user;
      const contacts = await this.contactService.findAll(
        user.userId,
        workspace_id,
      );

      const mappedContacts = contacts.map((contact) => {
        return [
          contact.fname,
          contact.lname,
          contact.phone_number,
          contact.email,
          contact.assignee && contact.assignee.email,
        ];
      });

      const parsedCsv = Papa.unparse({
        fields: [
          'First Name',
          'Last Name',
          'Phone Number',
          'Email',
          'Assignee',
        ],
        data: mappedContacts,
      });

      const buffer = Buffer.from(parsedCsv);

      res.set({
        'Content-Type': 'application/csv',
        'Content-Disposition': 'attachment; filename="data.csv"',
      });
      return new StreamableFile(buffer);
    } catch (error) {
      throw error;
    }
  }

  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceContact' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;
    const contacts = await this.contactService.findAll(
      user.userId,
      workspace_id,
    );
    return {
      data: contacts,
    };
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
