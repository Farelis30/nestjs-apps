import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: createNoteDto,
    });
  }

  async findAll() {
    return await this.prisma.note.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.note.findUnique({ where: { id } });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return await this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.note.delete({
      where: { id },
    });
  }
}
