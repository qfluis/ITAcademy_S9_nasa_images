import { TestBed } from '@angular/core/testing';

import { NasaRoverPhotosService } from './nasa-rover-photos.service';

describe('NasaRoverPhotosService', () => {
  let service: NasaRoverPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasaRoverPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
