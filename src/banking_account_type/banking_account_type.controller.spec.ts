import { Test, TestingModule } from '@nestjs/testing';
import { BankingAccountTypeController } from './banking_account_type.controller';

describe('BankingAccountTypeController', () => {
  let controller: BankingAccountTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankingAccountTypeController],
    }).compile();

    controller = module.get<BankingAccountTypeController>(BankingAccountTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
