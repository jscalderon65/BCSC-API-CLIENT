import { Test, TestingModule } from '@nestjs/testing';
import { BankingAccountTypeService } from './banking_account_type.service';

describe('BankingAccountTypeService', () => {
  let service: BankingAccountTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankingAccountTypeService],
    }).compile();

    service = module.get<BankingAccountTypeService>(BankingAccountTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
