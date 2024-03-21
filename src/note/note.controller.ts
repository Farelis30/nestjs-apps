import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';

@ApiTags('notes')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create Note' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: Note, description: 'Create Note' })
  create(@Body() createNoteDto: Note) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Note' })
  async findAll() {
    const note = this.noteService.findAll();
    if (!note) {
      throw new NotFoundException('There is no note available');
    }
    return note;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Note By Id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Note })
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(id.toString());
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Note By Id' })
  async update(@Param('id') id: string, @Body() updateNoteDto: Note) {
    const note = await this.noteService.update(id.toString(), updateNoteDto);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return { note: note, message: 'Note updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Note By Id' })
  @ApiResponse({
    status: 200,
    description: 'Note deleted successfully',
  })
  remove(@Param('id') id: string) {
    const note = this.noteService.remove(id.toString());
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return { message: 'Note deleted successfully' };
  }
}
