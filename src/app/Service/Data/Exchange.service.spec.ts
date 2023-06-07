/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExchangeService } from './Exchange.service';

describe('Service: Exchange', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeService]
    });
  });

  it('should ...', inject([ExchangeService], (service: ExchangeService) => {
    expect(service).toBeTruthy();
  }));
});
