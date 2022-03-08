import { TestBed } from '@angular/core/testing';

import { PictureOfTheDayService } from './picture-of-the-day.service';

describe('PictureOfTheDayService', () => {
  let service: PictureOfTheDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureOfTheDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
