import mongoose from 'mongoose';
import { CreateBankingAccountDto } from 'src/banking_account/dto/create-banking_account.dto';

export const CreateBankingAccountStub = (): CreateBankingAccountDto => {
  const objectId = new mongoose.Types.ObjectId().toString();
  return {
    account_type_id: objectId,

    available_balance: 0,

    client_id: objectId,
  };
};
