import { Test, TestingModule } from '@nestjs/testing';
import { AuthgaurdService } from './authgaurd.service';

describe('AuthgaurdService', () => {
  let service: AuthgaurdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthgaurdService],
    }).compile();

    service = module.get<AuthgaurdService>(AuthgaurdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
