import { TestBed } from '@angular/core/testing';

import { DscvrEpicPictureService } from './dscvr-epic-picture.service';

describe('DscvrEpicPictureService', () => {
  let service: DscvrEpicPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DscvrEpicPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
