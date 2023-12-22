import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBankingAccountDto {
  @ApiProperty({
    example: faker.finance.accountNumber(10),
  })
  @IsNotEmpty()
  @IsString()
  account_number: string;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  account_type_id: string;

  @ApiProperty({
    example: 0,
  })
  @IsNotEmpty()
  @IsString()
  available_balance: number;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  client_id: string;
}
