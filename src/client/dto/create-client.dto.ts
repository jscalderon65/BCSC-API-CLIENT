import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateClientDto {
  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  document_type_id: string;

  @ApiProperty({
    example: faker.finance.accountNumber(10),
  })
  @IsNotEmpty()
  @IsString()
  document_number: string;

  @ApiProperty({
    example: faker.person.firstName(),
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: faker.person.firstName(),
  })
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @ApiProperty({
    example: faker.person.lastName(),
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: faker.person.lastName(),
  })
  @IsNotEmpty()
  @IsString()
  second_last_name: string;

  @ApiProperty({
    example: faker.internet.email(),
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  city_id: string;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  account_id: string;
}
