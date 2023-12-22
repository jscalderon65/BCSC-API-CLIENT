import { PartialType } from '@nestjs/swagger';
import { CreateBankingAccountTypeDto } from './create-banking_account_type.dto';

export class UpdateBankingAccountTypeDto extends PartialType(
  CreateBankingAccountTypeDto,
) {}
