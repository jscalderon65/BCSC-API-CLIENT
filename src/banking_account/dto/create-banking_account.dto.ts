import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBankingAccountDto {
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
  @IsNumber()
  available_balance: number;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  client_id: string;
}
