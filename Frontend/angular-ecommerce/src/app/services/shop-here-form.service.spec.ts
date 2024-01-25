import { TestBed } from '@angular/core/testing';

import { ShopHereFormService } from './shop-here-form.service';

describe('ShopHereFormService', () => {
  let service: ShopHereFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopHereFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
