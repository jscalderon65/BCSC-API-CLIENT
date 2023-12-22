import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    example: 'Bogotá D.C',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsString()
  state_id: string;
}
