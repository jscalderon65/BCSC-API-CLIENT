import { PartialType } from '@nestjs/swagger';
import { CreateBankingAccountDto } from './create-banking_account.dto';

export class UpdateBankingAccountDto extends PartialType(
  CreateBankingAccountDto,
) {}
