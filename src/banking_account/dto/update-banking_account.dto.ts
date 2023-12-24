import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBankingAccountDto {
  @ApiProperty({
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  available_balance: number;
}
