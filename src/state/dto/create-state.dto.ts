import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({
    example: 'Cundinamarca',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
