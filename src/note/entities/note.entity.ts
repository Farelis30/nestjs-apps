import { ApiProperty } from '@nestjs/swagger';

export class Note {
  @ApiProperty({ example: 'Note title', description: 'The title of the Note' })
  title: string;

  @ApiProperty({
    example: 'Note content',
    description: 'The content of the Note',
  })
  content: string;
}
