import { Injectable } from '@nestjs/common';

@Injectable()
export class SplytServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
