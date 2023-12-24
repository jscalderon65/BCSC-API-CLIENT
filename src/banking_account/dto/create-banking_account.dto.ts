import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
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
  @IsString()
  available_balance: number;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  client_id: string;
}
