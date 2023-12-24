import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateClientDto {
  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
    description: 'Identifier of the document type.',
  })
  @IsNotEmpty()
  @IsString()
  document_type_id: string;

  @ApiProperty({
    example: '1234567890',
    description:
      'Document number of the client. Must be a string of length 10.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'Field must be exactly 10 characters' })
  @Matches(/^[0-9]+$/, { message: 'Field must contain only digits' })
  document_number: string;

  @ApiProperty({
    example: 'John',
    description:
      'First name of the client. Must be a string of at least 2 characters.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255, { message: 'First name must be at least 2 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Field must contain only letters' })
  first_name: string;

  @ApiProperty({
    example: 'Alex',
    description:
      'Middle name of the client. Must be a string of at least 2 characters.',
  })
  @IsOptional()
  @IsString()
  @Length(2, 255, { message: 'Middle name must be at least 2 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Field must contain only letters' })
  middle_name: string;

  @ApiProperty({
    example: 'Doe',
    description:
      'Last name of the client. Must be a string of at least 2 characters.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255, { message: 'Last name must be at least 2 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Field must contain only letters' })
  last_name: string;

  @ApiProperty({
    example: 'Smith',
    description:
      'Second last name of the client. Must be a string of at least 2 characters.',
  })
  @IsOptional()
  @IsString()
  @Length(2, 255, { message: 'Second last name must be at least 2 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Field must contain only letters' })
  second_last_name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the client. Must be a valid email format.',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
    description: 'Identifier of the city where the client resides.',
  })
  @IsNotEmpty()
  @IsString()
  city_id: string;
}
