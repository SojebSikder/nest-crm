import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { HasPlanGuard } from '../../../../common/guard/has-plan/has-plan.guard';
import { AbilitiesGuard } from '../../../../providers/ability/abilities.guard';
import { CheckAbilities } from '../../../../providers/ability/abilities.decorator';
import { Action } from '../../../../providers/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('snippet')
@UseGuards(JwtAuthGuard, AbilitiesGuard, HasPlanGuard)
@Controller('space/:workspace_id/snippet')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @ApiOperation({ summary: 'Create snippet' })
  @CheckAbilities({ action: Action.Create, subject: 'WorkspaceConversation' })
  @Post()
  async create(@Req() req, @Body() createSnippetDto: CreateSnippetDto) {
    try {
      const workspace_id = req.params.workspace_id;
      const user = req.user;

      const snippet = await this.snippetService.create(
        user.userId,
        workspace_id,
        createSnippetDto,
      );

      if (snippet) {
        return {
          success: true,
          message: 'Snippet created successfully',
        };
      } else {
        return {
          error: true,
          message: 'Snippet not created',
        };
      }
    } catch (error) {
      return {
        error: true,
        message: 'Something went wrong',
      };
    }
  }

  @ApiOperation({ summary: 'Read snippets' })
  @CheckAbilities({ action: Action.Read, subject: 'WorkspaceConversation' })
  @Get()
  async findAll(@Req() req) {
    const workspace_id = req.params.workspace_id;
    const user = req.user;

    const snippets = await this.snippetService.findAll(
      user.userId,
      workspace_id,
    );
    return {
      data: snippets,
    };
  }

  @ApiOperation({ summary: 'Show snippet' })
  @CheckAbilities({ action: Action.Show, subject: 'WorkspaceConversation' })
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    try {
      const user_id = req.user.userId;
      const workspace_id = req.params.workspace_id;

      const snippet = await this.snippetService.findOne(
        +id,
        user_id,
        workspace_id,
      );

      if (snippet) {
        return {
          data: snippet,
        };
      } else {
        return {
          error: true,
          message: 'Snippet not found.',
        };
      }
    } catch (error) {
      return {
        error: true,
        message: 'Something went wrong.',
      };
    }
  }

  @ApiOperation({ summary: 'Update snippet' })
  @CheckAbilities({ action: Action.Update, subject: 'WorkspaceConversation' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    try {
      const user_id = req.user.userId;
      const workspace_id = req.params.workspace_id;

      const snippet = await this.snippetService.update(
        +id,
        user_id,
        workspace_id,
        updateSnippetDto,
      );

      if (snippet) {
        return {
          data: snippet,
        };
      } else {
        return {
          error: true,
          message: 'Snippet not updated.',
        };
      }
    } catch (error) {
      return {
        error: true,
        message: 'Something went wrong.',
      };
    }
  }

  @ApiOperation({ summary: 'Delete snippet' })
  @CheckAbilities({ action: Action.Delete, subject: 'WorkspaceConversation' })
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    try {
      const user_id = req.user.userId;
      const workspace_id = req.params.workspace_id;

      const snippet = await this.snippetService.remove(
        +id,
        user_id,
        workspace_id,
      );

      if (snippet) {
        return {
          success: true,
          message: 'Snippet deleted successfully',
        };
      } else {
        return {
          error: true,
          message: 'Snippet not deleted',
        };
      }
    } catch (error) {
      return {
        error: true,
        message: 'Something went wrong.',
      };
    }
  }
}
