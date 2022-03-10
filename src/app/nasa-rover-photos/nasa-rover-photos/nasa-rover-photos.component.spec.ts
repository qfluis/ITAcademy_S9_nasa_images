import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaRoverPhotosComponent } from './nasa-rover-photos.component';

describe('NasaRoverPhotosComponent', () => {
  let component: NasaRoverPhotosComponent;
  let fixture: ComponentFixture<NasaRoverPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasaRoverPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaRoverPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
