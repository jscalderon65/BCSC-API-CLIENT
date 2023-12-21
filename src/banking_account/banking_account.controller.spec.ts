import { Test, TestingModule } from '@nestjs/testing';
import { BankingAccountController } from './banking_account.controller';

describe('BankingAccountController', () => {
  let controller: BankingAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankingAccountController],
    }).compile();

    controller = module.get<BankingAccountController>(BankingAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
