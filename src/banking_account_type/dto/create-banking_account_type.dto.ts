import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBankingAccountTypeDto {
  @ApiProperty({
    example: 'Cuenta corriente',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
