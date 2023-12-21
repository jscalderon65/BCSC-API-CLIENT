import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({
    example: 'CC',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'CC - Cédula de ciudadanía' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
