import { Test, TestingModule } from '@nestjs/testing';
import { BankingAccountService } from './banking_account.service';

describe('BankingAccountService', () => {
  let service: BankingAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankingAccountService],
    }).compile();

    service = module.get<BankingAccountService>(BankingAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
