import { Test, TestingModule } from '@nestjs/testing';
import { BankingAccountController } from './banking_account.controller';
import { BankingAccountService } from './banking_account.service';

describe('BankingAccountController', () => {
  let controller: BankingAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankingAccountController],
      providers: [BankingAccountService],
    }).compile();

    controller = module.get<BankingAccountController>(BankingAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
