import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBankingAccountDto {
  @ApiProperty({
    example: 0,
  })
  @IsNotEmpty()
  @IsString()
  available_balance: number;
}
