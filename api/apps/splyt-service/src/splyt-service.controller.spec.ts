import { Test, TestingModule } from '@nestjs/testing';
import { SplytServiceController } from './splyt-service.controller';
import { SplytServiceService } from './splyt-service.service';

describe('SplytServiceController', () => {
  let splytServiceController: SplytServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SplytServiceController],
      providers: [SplytServiceService],
    }).compile();

    splytServiceController = app.get<SplytServiceController>(SplytServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(splytServiceController.getHello()).toBe('Hello World!');
    });
  });
});
