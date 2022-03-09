import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DscvrEpicPictureComponent } from './dscvr-epic-picture.component';

describe('DscvrEpicPictureComponent', () => {
  let component: DscvrEpicPictureComponent;
  let fixture: ComponentFixture<DscvrEpicPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DscvrEpicPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DscvrEpicPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
