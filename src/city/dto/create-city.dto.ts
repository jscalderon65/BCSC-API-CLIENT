import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCityDto {
  @ApiProperty({
    example: 'Bogotá D.C',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  state_id: string;
}
